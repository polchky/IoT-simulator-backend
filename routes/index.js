const CombineRouters = require('koa-combine-routers');
const clients = require('@routes/clients');

const router = CombineRouters([
    clients,
]);

module.exports = router;
