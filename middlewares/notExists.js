const notExists = (model) => (referencedModel, all = false) => async (ctx, next) => {
    if (all) {
        const nDocs = await referencedModel.countDocuments({});
        if (nDocs > 0) ctx.throw(409);
        return next();
    }
    const name = model.modelName.charAt(0).toLowerCase() + model.modelName.slice(1);
    const nameId = `${name}Id`;
    const req = {};
    req[nameId] = ctx[name].id;
    const nDocs = await referencedModel.countDocuments(req);
    if (nDocs > 0) ctx.throw(409);

    return next();
};

module.exports = notExists;
