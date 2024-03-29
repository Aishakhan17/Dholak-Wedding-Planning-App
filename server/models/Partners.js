const mongoose = require("mongoose")

const PartnerSchene = new mongoose.Schema({
    businessName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    collecttion: {
        type: Object,
        required: false
    }
})