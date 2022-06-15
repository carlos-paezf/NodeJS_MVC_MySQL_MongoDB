const { Schema, model, Types } = require('mongoose')
const mongooseDelete = require('mongoose-delete');


const TrackSchema = new Schema(
    {
        name: { type: String },
        album: { type: String },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    // TODO: Validar la URL
                    return true;
                },
                message: "ERROR_URL"
            }
        },
        artist: {
            name: { type: String },
            nickname: { type: String },
            nationality: { type: String }
        },
        duration: {
            start: { type: Number },
            end: { type: Number }
        },
        mediaId: { type: Types.ObjectId }
    },
    {
        timestamps: true,
        versionKey: false
    }
)


TrackSchema.plugin(mongooseDelete, { overrideMethods: 'all' })
module.exports = model('tracks', TrackSchema)