const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const clientSchema = new Mongoose.Schema(
    {
        name: { type: String, required: true },
        isAdmin: { type: Boolean, required: true },
        isActive: { type: Boolean, required: true },
    },
    { strict: 'throw' },
);

clientSchema.plugin(autoIncrement.plugin, { model: 'Client', startAt: 1 });

module.exports = Mongoose.model('Client', clientSchema);
