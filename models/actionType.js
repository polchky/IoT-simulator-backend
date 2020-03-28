const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const actionTypeSchema = new Mongoose.Schema(
    {
        name: { type: String, required: true },
        structure: { type: JSON, required: true },
    },
    { strict: 'throw' },
);

actionTypeSchema.plugin(autoIncrement.plugin, { model: 'EventType', startAt: 1 });

module.exports = Mongoose.model('ActionType', actionTypeSchema);
