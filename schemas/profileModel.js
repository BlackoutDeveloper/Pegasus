const db = require('mongoose')
const { Schema, model } = require('mongoose')

const ProfileSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    AFK: {
        type: Boolean,
        required: true,
        default: false,
    },
})

const profileModel = module.exports = model('profiles', ProfileSchema);