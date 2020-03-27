const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const contextSchema = new Mongoose.Schema(
    {
        value: { type: String, required: true },
    },
    { strict: 'throw' },
);

contextSchema.plugin(autoIncrement.plugin, 'Context');

module.exports = Mongoose.model('Context', contextSchema);
