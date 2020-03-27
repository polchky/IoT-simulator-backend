const Router = require('koa-router');
const koaSwagger = require('koa2-swagger-ui');
const YAML = require('yamljs');
const fs = require('fs');

const router = new Router();


router.get('/doc', koaSwagger({
    routePrefix: false,
    swaggerOptions: { spec: YAML.parse(fs.readFileSync('./swagger.yaml', 'utf8')) },
}));

module.exports = router;
