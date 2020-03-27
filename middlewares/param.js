const param = (model) => async (id, ctx, next) => {
    let obj;
    const name = model.modelName.charAt(0).toLowerCase() + model.modelName.slice(1);
    try {
        obj = await model.findById(id);
    } catch (err) {
        ctx.throw(400);
    }
    if (!obj) ctx.throw(404);
    ctx[name] = obj.toJSON();
    return next();
};

module.exports = param;
