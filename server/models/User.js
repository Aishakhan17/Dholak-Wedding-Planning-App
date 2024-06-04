const mongoose = require("mongoose")
const {Schema} = mongoose
const Board = require("./Board")

const UserSchema = new mongoose.Schema({
    id: {
        type: String, 
        required: false
    },
    name: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    image: {
        data: Buffer,
        contentType: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

UserSchema.virtual("boards", {
    ref: "Board",
    localField: "_id",
    foreignField: "owner",
})



module.exports = mongoose.model("User", UserSchema)