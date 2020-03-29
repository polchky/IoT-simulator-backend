const Router = require('koa-router');
const {
    ActionMessage,
    Client,
    Event,
    EventType,
} = require('@models');
const { exists, NotExists, param } = require('@middlewares');

const notExists = NotExists(Event);

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

    .post('/', exists(Client), exists(EventType), async (ctx) => {
        try {
            const event = new Event(ctx.request.body);
            await event.save();
            ctx.body = event;
            ctx.status = 201;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .delete('/', notExists(ActionMessage, true), async (ctx) => {
        await Event.deleteMany({});
        ctx.status = 204;
    })

    .delete('/:eventId', notExists(ActionMessage), async (ctx) => {
        await Event.deleteOne({ _id: ctx.event.id });
        ctx.status = 204;
    });

module.exports = router;
