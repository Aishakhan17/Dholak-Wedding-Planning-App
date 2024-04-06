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
    // images: {
    //     type: Object, 
    //     default: {},
    //     required: false
    // },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User"
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