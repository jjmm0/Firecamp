const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Login: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: false,
        default: null,
    },
    Description: {
        type: String,
        required: false,
        default: "Your description",
    },
    Likes: {
        type: Number,
        required: false,
        default: 0,
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User