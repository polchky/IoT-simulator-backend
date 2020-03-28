const CombineRouters = require('koa-combine-routers');
const actionTypes = require('@routes/actionTypes');
const clients = require('@routes/clients');
const eventTypes = require('@routes/eventTypes');
const swagger = require('@routes/swagger');

const router = CombineRouters([
    actionTypes,
    clients,
    eventTypes,
    swagger,
]);

module.exports = router;
