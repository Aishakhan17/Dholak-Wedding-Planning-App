const mongoose = require("mongoose")
const Schema = mongoose

const ListSchema = new mongoose.Schema({
    board: {
        type: Schema.Types.ObjectId,
        ref: "Board"
    },
    title: {
        type: String
    }
}, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }

)

//add virtual property for list cards 
ListSchema.virtual("cards", {
    ref: "Card",
    localField: "_id",
    foreignField: "list",
})

module.exports = mongoose.model("List", ListSchema)