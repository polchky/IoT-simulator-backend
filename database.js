const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

Mongoose.plugin((schema) => {
    schema.options.toJSON = {
        versionKey: false,
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            if (ret.structure !== undefined) {
                ret.schema = ret.structure;
                delete ret.structure;
            }
        },
    };

    schema.pre('validate', async function validate() {
        if (this.schema !== undefined) {
            this.sctructure = this.schema;
            delete this.schema;
        }
    });
});

Mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

autoIncrement.initialize(Mongoose.connection);
