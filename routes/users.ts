import * as model from "../models/users";
import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";
import { basicAuth } from "../controllers/auth";
// import {validateArticle} from '../controllers/validation';

// Since we are handling articles use a URI that begins with an appropriate path
const router = new Router({prefix: '/api/v1/users'});
// Now we define the handler functions
const getAll = async (ctx: RouterContext, next: any) => {
    let users = await model.getAll();
    if (users.length){
        ctx.body = users;
    } else {
        ctx.body = {}
    }
}

const getById = async (ctx: RouterContext, next: any) => {
    let id = ctx.params.id;
    let users = await model.getById(id);
    if(users.length){
        ctx.body = users[0];
    } else {
        ctx.status = 404;
    }
    await next();
}

const getByName = async (ctx: RouterContext, next: any) => {
    let name = ctx.params.username;
    let users = await model.getByName(name);
    if(users.length){
        ctx.body = users[0];
    } else {
        ctx.status = 404;
    }
    await next();
}

const createUser = async (ctx: RouterContext, next: any) => {
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

const updateUser = async (ctx: RouterContext, next: any) => {
    let id = ctx.params.id;
    let context: any = ctx.request.body;
    let update_user = await model.updateById(context,id);
    let user = await model.getById(id);
    ctx.body = user;
    ctx.status = 200;  
    if (user.length){
        ctx.body = user;
    } else {
        ctx.body = {}
    }
    await next();
}

const deleteUser = async (ctx: RouterContext, next: any) => {
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
router.post('/', bodyParser(), createUser);
router.put('/:id([0-9]{1,})',basicAuth,bodyParser(),updateUser);
router.del('/:id([0-9]{1,})',basicAuth, deleteUser);

export { router };