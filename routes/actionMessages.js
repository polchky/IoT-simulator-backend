const Router = require('koa-router');
const { ActionMessage, Client } = require('@models');
const { param } = require('@middlewares');

const router = new Router({
    prefix: '/clients/:clientId/actions',
});

router
    .param('actionId', param(ActionMessage))
    .param('clientId', param(Client))

    .get('/', async (ctx) => {
        const actionMessages = await ActionMessage.find({ 'clients._id' : ctx.client.id }).select('-clients');
        ctx.body = actionMessages;
    })

    .get('/:actionId', async (ctx) => {
        try {
            console.log(ctx.actionMessage);
            const actionMessage = await ActionMessage.findOne({ 'clients._id' : ctx.client.id, _id: ctx.actionMessage.id }).select('-clients');
            ctx.body = actionMessage;
            ctx.status = 200; 
        } catch (err) {
            ctx.status = 404;
        }
    });

    /** 
    .delete('/', async (ctx) => {
        await ActionMessage.deleteMany({ clientId: ctx.client.id });
        ctx.status = 204;
    })

    .delete('/:actionMessageId', async (ctx) => {
        await ActionMessage.deleteOne({ _id: ctx.actionMessage.id });
        ctx.status = 204;
    });
    */

module.exports = router;
