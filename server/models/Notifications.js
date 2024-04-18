const mongoose = require("mongoose")
const {Schema} = mongoose
const User = require("../models/User")


const NotificationSchema = new mongoose.Schema({
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