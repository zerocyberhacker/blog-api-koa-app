import * as model from "../models/articles";
import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";
import { basicAuth } from "../controllers/auth";
// import {validateArticle} from '../controllers/validation';

// Since we are handling articles use a URI that begins with an appropriate path
const router = new Router({prefix: '/api/v1/articles'});

// Now we define the handler functions
const getAll = async (ctx: RouterContext, next: any) => {
    let articles = await model.getAll();
    if (articles.length){
        ctx.body = articles;
    } else {
        ctx.body = {}
    }
}

const getById = async (ctx: RouterContext, next: any) => {
    let id = ctx.params.id;
    let article = await model.getById(id);
    if(article.length){
        ctx.body = article[0];
    } else {
        ctx.status = 404;
    }
    await next();
}

const createArticle = async (ctx: RouterContext, next: any) => {
    const body = ctx.request.body;
    let result = await model.add(body);
    if(result.status==201) {
      ctx.status = 201;
      ctx.body = body;
    } else {
      ctx.status = 500;
      ctx.body = {err: "insert data failed"};
    }
    await next();
}

const updateArticle = async (ctx: RouterContext, next: any) => {
    let id = ctx.params.id;
    let context: any = ctx.request.body;
    let update_article = await model.updateById(context,id);
    let article = await model.getById(id);
    ctx.body = article;
    ctx.status = 200;  
    if (article.length){
        ctx.body = article;
    } else {
        ctx.body = {}
    }
    await next();
}

const deleteArticle = async (ctx: RouterContext, next: any) => {
    let id = ctx.params.id;
    await model.deleteById(id);
    let article = await model.getById(id);
    ctx.body = article;
    ctx.status = 200;  
    if (article.length){
    } else {
        ctx.body = `id:${id} deleted success`
    }
    await next();
}

router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);
router.post('/',basicAuth, bodyParser(), createArticle);
router.put('/:id([0-9]{1,})',basicAuth,bodyParser(),updateArticle);
router.del('/:id([0-9]{1,})',basicAuth, deleteArticle);

export { router };