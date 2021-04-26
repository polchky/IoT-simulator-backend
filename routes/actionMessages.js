const Router = require('koa-router');
const { ActionMessage, Client } = require('@models');
const { param } = require('@middlewares');

const router = new Router();

router
    .param('actionId', param(ActionMessage))
    .param('clientId', param(Client))

    .get('/clients/:clientId/actions/', async (ctx) => {
        const actionMessages = await ActionMessage.find({ 'clients._id' : ctx.client.id }).select('-clients');
        ctx.body = actionMessages;
    })

    .get('/clients/:clientId/actions/:actionId', async (ctx) => {
        try {
            console.log(ctx.actionMessage);
            const actionMessage = await ActionMessage.findOne({ 'clients._id' : ctx.client.id, _id: ctx.actionMessage.id }).select('-clients');
            ctx.body = actionMessage;
            ctx.status = 200; 
        } catch (err) {
            ctx.status = 404;
        }
    })

    .delete('/actions/', async (ctx) => {
        await ActionMessage.deleteMany({});
        ctx.status = 204;
    });

module.exports = router;
