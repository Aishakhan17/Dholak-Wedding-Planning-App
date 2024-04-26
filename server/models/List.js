const mongoose = require("mongoose")
const Schema = mongoose

const ListSchema = new mongoose.Schema({
    board: {
        type: Schema.Types.ObjectId,
        ref: "Board"
    },
    cards: {
        type: Schema.Types.ObjectId,
        ref: "Card"
    },
    title: {
        type: String
    }
})

module.exports = mongoose.model("List", ListSchema)