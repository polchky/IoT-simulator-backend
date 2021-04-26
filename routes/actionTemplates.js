const Router = require('koa-router');
const {
    ActionMessage,
    ActionTemplate,
    ActionType,
    Client,
    Rule,
} = require('@models');
const { exists, NotExists, param } = require('@middlewares');

const notExists = NotExists(ActionTemplate);

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

    .post('/', exists(ActionType), exists(Rule), async (ctx) => {
        try {
            ctx.request.body.clients = ctx.request.body.clients.map((c) => ({ _id: c.id }));
            const clients = await Client.find(
                { _id: { $in: ctx.request.body.clients.map((c) => c._id) } },
            );
            if (clients.length < ctx.request.body.clients.length) {
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

    .put('/:actionTemplateId', exists(ActionType), exists(Rule), async (ctx) => {
        try {
            ctx.request.body.clients = ctx.request.body.clients.map((c) => ({ _id: c.id }));
            const clients = await Client.find(
                { _id: { $in: ctx.request.body.clients.map((c) => c._id) } },
            );
            if (clients.length < ctx.request.body.clients.length) {
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
