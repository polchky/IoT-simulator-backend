const Router = require('koa-router');
const {
    ActionMessage,
    ActionTemplate,
    EventType,
    Rule,
} = require('@models');
const { exists, param, NotExists } = require('@middlewares');

const notExists = NotExists(Rule);

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

    .post('/', exists(EventType), async (ctx) => {
        try {
            const rule = new Rule(ctx.request.body);
            await rule.save();
            ctx.body = rule;
            ctx.status = 201;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .put('/:ruleId', exists(EventType), async (ctx) => {
        try {
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

    .delete('/', notExists(ActionTemplate, true), notExists(ActionMessage, true), async (ctx) => {
        await Rule.deleteMany({});
        ctx.status = 204;
    })

    .delete('/:ruleId', notExists(ActionTemplate), notExists(ActionMessage), async (ctx) => {
        await Rule.deleteOne({ _id: ctx.rule.id });
        ctx.status = 204;
    });

module.exports = router;
