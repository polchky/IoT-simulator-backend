const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const ruleSchema = new Mongoose.Schema(
    {
        name: { type: String, required: true },
        eventTypeId: { type: Number, ref: 'EventType', required: true },
        isActive: { type: Boolean, required: true },
        function: { type: String, required: true },
        context: { type: JSON, required: true },
    },
    { strict: 'throw', minimize: false },
);

ruleSchema.plugin(autoIncrement.plugin, { model: 'Rule', startAt: 1 });

module.exports = Mongoose.model('Rule', ruleSchema);
