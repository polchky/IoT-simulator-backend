const Router = require('koa-router');
const { EventType, Rule } = require('@models');
const { param } = require('@middlewares');

const router = new Router({
    prefix: '/rules',
});

router
    .param('ruleId', param(Rule))

    .get('/', async (ctx) => {
        const rules = await Rule.find();
        ctx.body = rules;
    })

    .get('/:ruleId', (ctx) => {
        ctx.body = ctx.rule;
    })

    .post('/', async (ctx) => {
        try {
            const eventType = await EventType.findById(ctx.request.body.eventTypeId);
            if (eventType === null) {
                ctx.status = 409;
                return;
            }
            const rule = new Rule(ctx.request.body);
            await rule.save();
            ctx.body = rule;
            ctx.status = 201;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .put('/:ruleId', async (ctx) => {
        try {
            const eventType = await EventType.findById(ctx.request.body.eventTypeId);
            if (eventType === null) {
                ctx.status = 409;
                return;
            }
            ctx.body = await Rule.findByIdAndUpdate(
                ctx.rule.id,
                ctx.request.body,
                { new: true },
            );
            ctx.status = 200;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .delete('/', async (ctx) => {
        await Rule.deleteMany({});
        ctx.status = 204;
    })

    .delete('/:ruleId', async (ctx) => {
        await Rule.deleteOne({ _id: ctx.rule.id });
        ctx.status = 204;
    });

module.exports = router;
