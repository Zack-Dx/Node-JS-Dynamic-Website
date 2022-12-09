const mongoose = require('mongoose');
const validator = require('validator');

//Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid E-mail ID');
            }
        },
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
    },
    message: {
        type: String,
        required: true,
        minLength: 3,
    },
});

// We need to create a collection

const User = mongoose.model('User', userSchema);

module.exports = User;
