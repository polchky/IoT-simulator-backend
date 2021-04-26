const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const eventSchema = new Mongoose.Schema(
    {
        clientId: { type: Number, required: true },
        eventTypeId: { type: Number, required: true },
        properties: { type: JSON, required: true },
        timestamp: { type: Date, required: true },
    },
    { strict: 'throw', minimize: false },
);

eventSchema.plugin(autoIncrement.plugin, { model: 'Event', startAt: 1 });

module.exports = Mongoose.model('Event', eventSchema);
