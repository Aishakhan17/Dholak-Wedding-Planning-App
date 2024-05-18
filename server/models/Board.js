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
    // images: [{
    //     data: Buffer,
    //     contentType: String
    // }],
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
}, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })

BoardSchema.virtual("lists", {
    ref: "List",
    localField: "_id",
    foreignField: "board"
})

BoardSchema.virtual("images", {
    ref: "Image",
    localField: "_id",
    foreignField: "board"
})

module.exports = mongoose.model("Board", BoardSchema)