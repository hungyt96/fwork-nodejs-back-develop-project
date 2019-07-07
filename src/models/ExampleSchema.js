const config = require("../../config/config");
const mongoose = require('mongoose');

const User = new mongoose.Schema({
    password: String,
    email: String
    // add new fields
});

const UserModel = mongoose.model("user", User);

module.exports = UserModel;