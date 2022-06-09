const { Schema, model } = require('mongoose')


const StorageSchema = new Schema(
    {
        url: { type: String },
        filename: { type: String }
    },
    {
        timestamps: true,
        versionKey: false
    }
)


module.exports = model('storages', StorageSchema)