const mongoose = require('mongoose')

const TicketDataSchema = new mongoose.Schema({
    ChannelID: {
        type: String,
        required: true,
    },
    tNumber: {
        type: Number,
        required: true,
    },
    UserID: {
        type: String,
        required: true,
    },
})

const MessageModel = module.exports = mongoose.model('TicketData', TicketDataSchema)