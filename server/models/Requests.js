const mongoose = require("mongoose")
const {Schema} = mongoose
const User = require("./User")

const RequestSchema = new mongoose.Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reference: {
        type: Schema.Types.ObjectId,
        ref: "Board"
    },
    status: {
        type: Boolean,
    },
})

module.exports = mongoose.model("Requests", RequestSchema)