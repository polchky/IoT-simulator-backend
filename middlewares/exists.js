const exists = (model) => async (ctx, next) => {
    let obj;
    const name = `${model.modelName.charAt(0).toLowerCase()}${model.modelName.slice(1)}Id`;
    if (ctx.request.body[name] === undefined) ctx.throw(400);
    try {
        obj = await model.findById(ctx.request.body[name]);
    } catch (err) {
        ctx.throw(400);
    }
    if (obj === null) ctx.throw(409);
    return next();
};

module.exports = exists;
