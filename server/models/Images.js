const mongoose = require("mongoose")
const {Schema} = mongoose

let imageSchema = new mongoose.Schema({
    board: {
        type: Schema.Types.ObjectId,
        ref: "Board"
    },
    image: {
        data: Buffer,
        contentType: String,
    }
})

module.exports = mongoose.model("Image", imageSchema)