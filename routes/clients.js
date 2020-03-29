const Router = require('koa-router');
const { ActionTemplate, Client, Event } = require('@models');
const { NotExists, param } = require('@middlewares');

const notExists = NotExists(Client);

const router = new Router({
    prefix: '/clients',
});

router
    .param('clientId', param(Client))

    .get('/', async (ctx) => {
        ctx.body = await Client.find();
    })

    .get('/:clientId', (ctx) => {
        ctx.body = ctx.client;
    })

    .post('/', async (ctx) => {
        try {
            const client = new Client(ctx.request.body);
            await client.save();
            ctx.body = client;
            ctx.status = 201;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .put('/:clientId', async (ctx) => {
        try {
            ctx.body = await Client.findByIdAndUpdate(
                ctx.client.id,
                ctx.request.body,
                { new: true },
            );
            ctx.status = 200;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .delete('/', notExists(Event, true), notExists(ActionTemplate, true), async (ctx) => {
        await Client.deleteMany({});
        ctx.status = 204;
    })

    .delete('/:clientId', notExists(Event), notExists(ActionTemplate), async (ctx) => {
        await Client.deleteOne({ _id: ctx.client.id });
        ctx.status = 204;
    });

module.exports = router;
