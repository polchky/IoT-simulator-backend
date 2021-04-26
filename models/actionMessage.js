const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const clientIdSchema = new Mongoose.Schema({
    _id: { type: Number, ref: 'Client' },
});

const actionMessageSchema = new Mongoose.Schema(
    {
        message: { type: JSON, required: true },
        timestamp: { type: String, required: true },
        eventId: { type: Number, required: true },
        ruleId: { type: Number, required: true },
        actionTemplateId: { type: Number, required: true },
        clients: [clientIdSchema],
    },
    { strict: 'throw', minimize: false },
);

actionMessageSchema.plugin(autoIncrement.plugin, { model: 'ActionMessage', startAt: 1 });

module.exports = Mongoose.model('ActionMessage', actionMessageSchema);
