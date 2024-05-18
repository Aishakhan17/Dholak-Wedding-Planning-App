const mongoose = require("mongoose")
const Schema = mongoose


const CardSchema = new mongoose.Schema({
    title: {
        type: String
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: "List"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String
    }, 
}, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
})

CardSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "card"
})

module.exports = mongoose.model("Card", CardSchema)