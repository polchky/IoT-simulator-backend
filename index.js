require('module-alias/register');
require('@database');
const Koa = require('koa');
const Cors = require('@koa/cors');
const BodyParser = require('koa-bodyparser');
const Router = require('@routes');

const app = new Koa();

app
    .use(BodyParser())
    .use(Cors())
    .use(Router())
    .listen(process.env.PORT);
