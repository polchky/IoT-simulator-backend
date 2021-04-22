/* eslint-disable no-new-func */
/* eslint-disable no-restricted-globals */

const Router = require('koa-router');
const {
    ActionMessage,
    Client,
    Context,
    Event,
    EventType,
    Rule,
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
        // Save event
        let event;
        try {
            event = new Event(ctx.request.body);
            await event.save();
            ctx.body = event;
            ctx.status = 201;
        } catch (err) {
            ctx.status = 400;
            return;
        }
        // Evaluate rules
        try {
            let globalContext = await Context.findOne({});
            if (globalContext === null) globalContext = {};
            const rules = await Rule.find({ eventTypeId: event.eventTypeId });
            for (let i = 0; i < rules.length; i += 1) {
                this.context = { local: rules[i].context, global: globalContext };
                const fun = new Function('event', `context = this.context; ${rules[i].function}`);
                console.log(rules[i].function);
                console.log(event.properties);
                const ret = fun.apply(this, [event.properties]);
                console.log(context);
                console.log(ret);
            }
        } catch (err) {
            console.log(err);
            ctx.status = 500;
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
