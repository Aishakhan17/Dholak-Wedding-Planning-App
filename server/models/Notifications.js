const mongoose = require("mongoose")
const {Schema} = mongoose
const User = require("../models/User")


const NotificationSchema = new mongoose.Schema({
    board: {
        type: Schema.Types.ObjectId,
        ref: "Board"
    },
    toUser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    fromUser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    body: {
        type: String,
    }
})

module.exports = mongoose.model("Notifications", NotificationSchema)