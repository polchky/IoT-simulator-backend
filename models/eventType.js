const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const eventTypeSchema = new Mongoose.Schema(
    {
        name: { type: String, required: true },
        structure: { type: JSON, required: true },
    },
    { strict: 'throw' },
);

eventTypeSchema.plugin((schema) => {
    schema.options.toJSON = {
        transform(doc, ret) {
            ret.schema = ret.structure;
        },
    };
});

eventTypeSchema.plugin(autoIncrement.plugin, { model: 'EventType', startAt: 1 });

module.exports = Mongoose.model('EventType', eventTypeSchema);
