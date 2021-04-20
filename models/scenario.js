const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const scenarioSchema = new Mongoose.Schema(
    {
        document: { type: JSON, required: true },
    },
    { strict: 'throw', minimize: false },
);

scenarioSchema.plugin(autoIncrement.plugin, { model: 'Scenario', startAt: 1 });

module.exports = Mongoose.model('Scenario', scenarioSchema);
