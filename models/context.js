const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const contextSchema = new Mongoose.Schema(
    {
        value: { type: String, required: true },
    },
    { strict: 'throw', minimize: false },
);

contextSchema.plugin(autoIncrement.plugin, { model: 'Context', startAt: 1 });

module.exports = Mongoose.model('Context', contextSchema);
