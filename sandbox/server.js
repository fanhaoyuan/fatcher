const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const fs = require('fs');
const app = new Koa();
const router = new Router();

let getInfo = fs.readFileSync('./static/get.json').toString();
let postInfo = fs.readFileSync('./static/post.json').toString();

router.get('/check/getCheckInfo', (ctx, next) => {
    ctx.set('Content-Type', 'application/json');
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.body = getInfo;
    next();
});

router.post('/group/groupList', (ctx, next) => {
    ctx.set('Content-Type', 'application/json');
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.body = postInfo;
    next();
});

app.use(router.routes()).use(router.allowedMethods()).use(cors());

app.listen(3000, () => {
    console.log('server is starting at port 3000');
});
