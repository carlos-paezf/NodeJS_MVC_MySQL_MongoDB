const { Schema, model, Types, default: mongoose } = require('mongoose')
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


TrackSchema.statics.findAllData = function () {
    const joinData = this.aggregate([
        {
            $lookup: {
                from: 'storages',
                localField: 'mediaId',
                foreignField: '_id',
                as: 'audio'
            }
        }, 
        {
            $unwind: '$audio'
        }
    ])
    return joinData
}

TrackSchema.statics.findOneData = function (id) {
    const joinData = this.aggregate([
        {
            $lookup: {
                from: 'storages',
                localField: 'mediaId',
                foreignField: '_id',
                as: 'audio'
            }
        }, 
        {
            $unwind: '$audio'
        },
        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        }
    ])
    return joinData
}

TrackSchema.plugin(mongooseDelete, { overrideMethods: 'all' })
module.exports = model('tracks', TrackSchema)