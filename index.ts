import Koa from "koa";
import Router, {RouterContext} from "koa-router";
import logger from "koa-logger";
import json from "koa-json";    
import bodyParser from "koa-bodyparser";
import serve from 'koa-static-server';
import {router as articles} from "./routes/articles";

const app: Koa = new Koa();
const router: Router = new Router();

/*
    ctx.body <- respond body
    ctx.request.body <- what data you want to output respond
*/


const welcomeAPI = async (ctx: RouterContext, next: any) => {
    ctx.body = {
    message: "Welcome to the blog API!"
    };
    await next();
}
router.get('/api/v1', welcomeAPI);

app.use(logger());
app.use(json());
app.use(router.routes());

// Other code statements go here
app.use(articles.routes());
// app.use(router.routes()).use(router.allowedMethods());

app.listen(10888, () => {
    console.log("Koa Started->","http://localhost:"+10888);
})