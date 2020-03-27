const CombineRouters = require('koa-combine-routers');
const clients = require('@routes/clients');
const swagger = require('@routes/swagger');

const router = CombineRouters([
    clients,
    swagger,
]);

module.exports = router;
