const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const clientSchema = new Mongoose.Schema(
    {
        name: { type: String, required: true },
    },
    { strict: 'throw' },
);

clientSchema.plugin(autoIncrement.plugin, 'Client');

module.exports = Mongoose.model('Client', clientSchema);
