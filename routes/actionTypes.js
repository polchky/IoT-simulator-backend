const Router = require('koa-router');
const { ActionType } = require('@models');
const { param } = require('@middlewares');

const router = new Router({
    prefix: '/actiontypes',
});

const transform = (body) => {
    const ret = body;
    ret.structure = ret.schema;
    delete ret.schema;
    return ret;
};

router
    .param('actionTypeId', param(ActionType))

    .get('/', async (ctx) => {
        ctx.body = await ActionType.find();
    })

    .get('/:actionTypeId', (ctx) => {
        ctx.body = ctx.actionType;
    })

    .post('/', async (ctx) => {
        try {
            const body = transform(ctx.request.body);
            const eventType = new ActionType(body);
            await eventType.save();
            ctx.body = eventType;
            ctx.status = 201;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .put('/:actionTypeId', async (ctx) => {
        try {
            const body = transform(ctx.request.body);
            ctx.body = await ActionType.findByIdAndUpdate(
                ctx.actionType.id,
                body,
                { new: true },
            );
            ctx.status = 200;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .delete('/', async (ctx) => {
        await ActionType.deleteMany({});
        ctx.status = 204;
    })

    .delete('/:actionTypeId', async (ctx) => {
        await ActionType.deleteOne({ _id: ctx.actionType.id });
        ctx.status = 204;
    });

module.exports = router;
