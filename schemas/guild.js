const db = require('mongoose')
const { Schema, model } = require('mongoose')

const guildDoc = new Schema({
    tCount: {
        type: Number,
        required: true,
    },
    ID: {
        type: Number,
        required: true,
        default: 1,
    },
    Idrt: {
        type: Number,
        required: true,
    }
})

const guildDocu = module.exports = model('general', guildDoc);