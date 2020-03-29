const Router = require('koa-router');
const { Event, EventType, Rule } = require('@models');
const { param, NotExists } = require('@middlewares');

const notExists = NotExists(EventType);

const router = new Router({
    prefix: '/eventtypes',
});

const transform = (body) => {
    const ret = body;
    ret.structure = ret.schema;
    delete ret.schema;
    return ret;
};

router
    .param('eventTypeId', param(EventType))

    .get('/', async (ctx) => {
        ctx.body = await EventType.find();
    })

    .get('/:eventTypeId', (ctx) => {
        ctx.body = ctx.eventType;
    })

    .post('/', async (ctx) => {
        try {
            const body = transform(ctx.request.body);
            const eventType = new EventType(body);
            await eventType.save();
            ctx.body = eventType;
            ctx.status = 201;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .put('/:eventTypeId', async (ctx) => {
        try {
            const body = transform(ctx.request.body);
            ctx.body = await EventType.findByIdAndUpdate(
                ctx.eventType.id,
                body,
                { new: true },
            );
            ctx.status = 200;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .delete('/', notExists(Event, true), notExists(Rule, true), async (ctx) => {
        await EventType.deleteMany({});
        ctx.status = 204;
    })

    .delete('/:eventTypeId', notExists(Event), notExists(Rule), async (ctx) => {
        await EventType.deleteOne({ _id: ctx.eventType.id });
        ctx.status = 204;
    });

module.exports = router;
