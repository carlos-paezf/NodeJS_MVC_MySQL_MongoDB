const { Schema, model } = require('mongoose')


const UserSchema = new Schema(
    {
        name: { type: String }, 
        age: { type: Number },
        email: {
            type: String,
            unique: true
        },
        password: { type: String },
        role: {
            type: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)


module.exports = model('users', UserSchema)