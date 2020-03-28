const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const actionMessageSchema = new Mongoose.Schema(
    {
        message: { type: String, required: true },
        timestamp: { type: String, required: true },
        eventId: { type: Number, ref: 'Event', required: true },
        ruleId: { type: Number, ref: 'Rule', required: true },
        actionTemplateId: { type: Number, ref: 'ActionTemplate', required: true },
    },
    { strict: 'throw', minimize: false },
);

actionMessageSchema.plugin(autoIncrement.plugin, 'ActionMessage');

module.exports = Mongoose.model('ActionMessage', actionMessageSchema);
