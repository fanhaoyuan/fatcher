const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const fs = require('fs');
const app = new Koa();
const router = new Router();
const bodyParser = new BodyParser();

router.use(bodyParser);

let getInfo = fs.readFileSync('./static/get.json').toString();
let postInfo = fs.readFileSync('./static/post.json').toString();

router.get('/zcs/check/getCheckInfo', (ctx, next) => {
    ctx.set('Content-Type', 'application/json');
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.body = {
        data: getInfo,
        code: 200,
        success: true,
    };
    next();
});

router.post('/zcs/group/groupList', (ctx, next) => {
    ctx.set('Content-Type', 'application/json');
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.body = {
        data: postInfo,
        code: 200,
        success: true,
    };
    console.log('------------------------------------------------------');
    console.log(ctx.request);
    console.log(ctx.request.body);
    next();
});

app.use(router.routes()).use(router.allowedMethods()).use(cors());

app.listen(3000, () => {
    console.log('server is starting at port 3000');
});
