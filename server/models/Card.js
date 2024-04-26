const mongoose = require("mongoose")
const Schema = mongoose


const CardSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model("Card", CardSchema)