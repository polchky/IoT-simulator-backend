const CombineRouters = require('koa-combine-routers');
const clients = require('@routes/clients');
const eventTypes = require('@routes/eventTypes');
const swagger = require('@routes/swagger');

const router = CombineRouters([
    clients,
    eventTypes,
    swagger,
]);

module.exports = router;
