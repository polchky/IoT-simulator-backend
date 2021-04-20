const Router = require('koa-router');
const {
    Scenario,
} = require('@models');

const { param } = require('@middlewares');

const router = new Router({
    prefix: '/scenarios',
});

router
    .param('scenarioId', param(Scenario))

    .get('/', async (ctx) => {
        ctx.body = await Scenario.find();
    })

    .get('/:scenarioId', (ctx) => {
        ctx.body = ctx.scenario;
    })

    .post('/', async (ctx) => {
        try {
            const scenario = new Scenario(ctx.request.body);
            await scenario.save();
            ctx.body = scenario;
            ctx.status = 201;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .put('/:scenarioId', async (ctx) => {
        try {
            ctx.body = await Scenario.findByIdAndUpdate(
                ctx.scenario.id,
                ctx.request.body,
                { new: true },
            );
            ctx.status = 200;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .delete('/', async (ctx) => {
        await Scenario.deleteMany({});
        ctx.status = 204;
    })

    .delete('/:scenarioId', async (ctx) => {
        await Scenario.deleteOne({ _id: ctx.scenario.id });
        ctx.status = 204;
    });

module.exports = router;
