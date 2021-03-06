const CombineRouters = require('koa-combine-routers');

const actionMessages = require('@routes/actionMessages');
const actionTemplates = require('@routes/actionTemplates');
const actionTypes = require('@routes/actionTypes');
const clients = require('@routes/clients');
const events = require('@routes/events');
const eventTypes = require('@routes/eventTypes');
const rules = require('@routes/rules');
const scenarios = require('@routes/scenarios');
const swagger = require('@routes/swagger');

const router = CombineRouters([
    actionMessages,
    actionTemplates,
    actionTypes,
    clients,
    events,
    eventTypes,
    rules,
    scenarios,
    swagger,
]);

module.exports = router;
