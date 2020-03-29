const exists = require('@middlewares/exists');
const NotExists = require('@middlewares/notExists');
const param = require('@middlewares/param');

const middlewares = {
    exists,
    NotExists,
    param,
};

module.exports = middlewares;
