const Router = require('koa-router');
const { EventType } = require('@models');
const { param } = require('@middlewares');

const router = new Router({
    prefix: '/eventtypes',
});

router
    .param('eventTypeId', param(EventType))

    .get('/', async (ctx) => {
        const eventTypes = await EventType.find();
        ctx.body = eventTypes;
    })

    .get('/:eventTypeId', (ctx) => {
        ctx.body = ctx.eventType;
    })

    .post('/', async (ctx) => {
        try {
            ctx.request.body.structure = ctx.request.body.schema;
            delete ctx.request.body.schema;
            const eventType = new EventType(ctx.request.body);
            await eventType.save();
            ctx.body = eventType;
            ctx.status = 201;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .put('/:eventTypeId', async (ctx) => {
        try {
            ctx.request.body.structure = ctx.request.body.schema;
            delete ctx.request.body.schema;
            ctx.body = await EventType.findByIdAndUpdate(
                ctx.eventType.id,
                ctx.request.body,
                { new: true },
            );
            ctx.status = 200;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .delete('/', async (ctx) => {
        await EventType.deleteMany({});
        ctx.status = 204;
    })

    .delete('/:eventTypeId', async (ctx) => {
        await EventType.deleteOne({ _id: ctx.eventType.id });
        ctx.status = 204;
    });

module.exports = router;
