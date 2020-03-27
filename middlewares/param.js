const param = (model) => async (id, ctx, next) => {
    let obj;
    const name = model.modelName.toLowerCase();
    try {
        obj = await model.findById(id);
    } catch (err) {
        ctx.throw(400);
    }
    if (!obj) ctx.throw(404);
    obj.setLanguage(ctx.language);
    ctx[name] = obj.toJSON();
    return next();
};

module.exports = param;
