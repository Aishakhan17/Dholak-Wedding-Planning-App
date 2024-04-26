const mongoose = require("mongoose")
const {Schema} = mongoose
const User = require("./User")


const BoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    cover: {
        data: Buffer,
        contentType: String,
    },
    images: [{
        data: Buffer,
        contentType: String
    }],
    lists: [{
        type: Schema.Types.ObjectId,
        ref: "List" 
    }],
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    notifications : [{
        type: Schema.Types.ObjectId,
        ref: "Notifications"
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    private: {
        type: Boolean, 
        required: false
    }
})

module.exports = mongoose.model("Board", BoardSchema)