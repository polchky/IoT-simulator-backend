const Router = require('koa-router');
const { Client, Event, EventType } = require('@models');
const { param } = require('@middlewares');

const router = new Router({
    prefix: '/events',
});

router
    .param('eventId', param(Event))

    .get('/', async (ctx) => {
        ctx.body = await Event.find();
    })

    .get('/:eventId', (ctx) => {
        ctx.body = ctx.event;
    })

    .post('/', async (ctx) => {
        try {
            const eventType = await EventType.findById(ctx.request.body.eventTypeId);
            const client = await Client.findById(ctx.request.body.clientId);
            if (client === null || eventType === null) {
                ctx.status = 409;
                return;
            }

            const event = new Event(ctx.request.body);
            await event.save();
            ctx.body = event;
            ctx.status = 201;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .delete('/', async (ctx) => {
        await Event.deleteMany({});
        ctx.status = 204;
    })

    .delete('/:eventId', async (ctx) => {
        await Event.deleteOne({ _id: ctx.event.id });
        ctx.status = 204;
    });

module.exports = router;
