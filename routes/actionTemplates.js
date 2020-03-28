const Router = require('koa-router');
const {
    ActionTemplate,
    ActionType,
    Client,
    Rule,
} = require('@models');
const { param } = require('@middlewares');

const router = new Router({
    prefix: '/actiontemplates',
});

router
    .param('actionTemplateId', param(ActionTemplate))

    .get('/', async (ctx) => {
        ctx.body = await ActionTemplate.find();
    })

    .get('/:actionTemplateId', (ctx) => {
        ctx.body = ctx.actionTemplate;
    })

    .post('/', async (ctx) => {
        try {
            const rule = await Rule.findById(ctx.request.body.ruleId);
            const actionType = await ActionType.findById(ctx.request.body.actionTypeId);
            ctx.request.body.clients = ctx.request.body.clients.map((c) => ({ _id: c.id }));
            const clients = await Client.find(
                { _id: { $in: ctx.request.body.clients.map((c) => c._id) } },
            );
            if (
                rule === null
                || actionType === null
                || clients.length < ctx.request.body.clients.length
            ) {
                ctx.status = 409;
                return;
            }

            const actionTemplate = new ActionTemplate(ctx.request.body);
            await actionTemplate.save();
            ctx.body = actionTemplate;
            ctx.status = 201;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .put('/:actionTemplateId', async (ctx) => {
        try {
            const rule = await Rule.findById(ctx.request.body.ruleId);
            const actionType = await ActionType.findById(ctx.request.body.actionTypeId);
            ctx.request.body.clients = ctx.request.body.clients.map((c) => ({ _id: c.id }));
            const clients = await Client.find(
                { _id: { $in: ctx.request.body.clients.map((c) => c._id) } },
            );
            if (
                rule === null
                || actionType === null
                || clients.length < ctx.request.body.clients.length
            ) {
                ctx.status = 409;
                return;
            }

            ctx.body = await ActionTemplate.findByIdAndUpdate(
                ctx.actionTemplate.id,
                ctx.request.body,
                { new: true },
            );
            ctx.status = 200;
        } catch (err) {
            ctx.status = 400;
        }
    })

    .delete('/', async (ctx) => {
        await ActionTemplate.deleteMany({});
        ctx.status = 204;
    })

    .delete('/:actionTemplateId', async (ctx) => {
        await ActionTemplate.deleteOne({ _id: ctx.actionTemplate.id });
        ctx.status = 204;
    });

module.exports = router;
