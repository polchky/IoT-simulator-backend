const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

Mongoose.plugin((schema) => {
    schema.options.toJSON = {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
            delete ret._id;
        },
    };
});

Mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

autoIncrement.initialize(Mongoose.connection);
