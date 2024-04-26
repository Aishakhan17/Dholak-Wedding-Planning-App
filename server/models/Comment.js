const mongoose = require("mongoose")
const Schema = mongoose 

const CommentSchema = mongoose.Schema({
    card: {
        type: Schema.Types.ObjectId,
        ref: "Card"
    },
    body: {
        type: String
    }
})

module.exports = mongoose.model("Comment", CommentSchema)
