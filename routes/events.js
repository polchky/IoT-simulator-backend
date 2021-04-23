/* eslint-disable no-new-func */
/* eslint-disable no-restricted-globals */

const Router = require('koa-router');
const {
    ActionMessage,
    ActionTemplate,
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

                const rule = rules[i];
                this.context = { local: rule.context, global: globalContext };
                const fun = new Function('event', `context = this.context; ${rule.function}`);
                const ret = fun.apply(this, [event.properties]);
                await Rule.updateOne({ _id: rule._id }, { context: rule.context });
                // Create messages
                if (ret) {
                    const actionTemplates = await ActionTemplate.find({ ruleId: rule._id });
                    for (let j = 0; j < actionTemplates.length; j += 1) {
                        const actionTemplate = actionTemplates[j];
                        this.context = { local: actionTemplate.context, global: globalContext };
                        const fun = new Function('event', `context = this.context; ${actionTemplate.function}`);
                        const message = fun.apply(this, [event.properties]);
                        await ActionTemplate.updateOne({ _id: actionTemplate._id }, { context: actionTemplate.context });
                        const actionMessage = new ActionMessage({
                            message,
                            timestamp: new Date().toISOString(),
                            eventId: event._id,
                            ruleId: rule._id,
                            actionTemplateId: actionTemplate._id,
                            clients: actionTemplate.clients,
                        });
                        await actionMessage.save();
                    }
                }
            }

            await Context.updateOne({}, { value: globalContext });
            ctx.status = 204;
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
