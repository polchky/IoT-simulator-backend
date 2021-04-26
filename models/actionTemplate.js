const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const clientIdSchema = new Mongoose.Schema({
    _id: { type: Number, ref: 'Client' },
});

const actionTemplateSchema = new Mongoose.Schema(
    {
        name: { type: String, required: true },
        ruleId: { type: Number, required: true },
        actionTypeId: { type: Number, required: true },
        function: { type: String, required: true },
        context: { type: JSON, required: true },
        clients: [clientIdSchema],
    },
    { strict: 'throw', minimize: false },
);

actionTemplateSchema.plugin(autoIncrement.plugin, { model: 'ActionTemplate', startAt: 1 });

module.exports = Mongoose.model('ActionTemplate', actionTemplateSchema);
