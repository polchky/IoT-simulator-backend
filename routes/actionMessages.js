const Router = require('koa-router');
const { ActionMessage, Client } = require('@models');
const { param } = require('@middlewares');

const router = new Router({
    prefix: '/clients/:clientId/actions',
});

router
    .param('actionMessageId', param(ActionMessage))
    .param('clientId', param(Client))

    .get('/', async (ctx) => {
        const actionMessages = await ActionMessage.find({ clientId: ctx.client.id });
        ctx.body = actionMessages;
    })

    .delete('/', async (ctx) => {
        await ActionMessage.deleteMany({ clientId: ctx.client.id });
        ctx.status = 204;
    })

    .delete('/:actionMessageId', async (ctx) => {
        await ActionMessage.deleteOne({ _id: ctx.actionMessage.id });
        ctx.status = 204;
    });

module.exports = router;
