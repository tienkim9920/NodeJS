var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        fullname: String,
        phone: String,
        email: String,
        password: String,
        status: Boolean,
        cart: Array
    }
);

var User = mongoose.model('User', schema, 'users');

module.exports = User;