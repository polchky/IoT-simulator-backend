const CombineRouters = require('koa-combine-routers');

const actionTemplates = require('@routes/actionTemplates');
const actionTypes = require('@routes/actionTypes');
const clients = require('@routes/clients');
const events = require('@routes/events');
const eventTypes = require('@routes/eventTypes');
const rules = require('@routes/rules');
const swagger = require('@routes/swagger');

const router = CombineRouters([
    actionTemplates,
    actionTypes,
    clients,
    events,
    eventTypes,
    rules,
    swagger,
]);

module.exports = router;
