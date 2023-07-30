const mongoose = require("mongoose");
const validator = require("validator");

const usersSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trime: true,
    },
    lname: {
        type: String,
        required: true,
        trime: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("Not valid email");
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        // minlength: 10,
        // maxlength: 10,
    },
    gender: {
        type: String,
        required: true,

    },
    status: {
        type: String,
        requried: true,
    },
    location: {
        type: String,
        requried: true,
    },
    profile: {
        type: String,
        requried: true,
    },
    datecreated: Date,
    dateUpdated: Date,
});

// Model 
const users = new mongoose.model("users", usersSchema);

module.exports = users;