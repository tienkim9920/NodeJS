var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        name: String,
        price: String,
        email: String,
        password: String,
        avatar: String
    }
);

var User = mongoose.model('User', schema, 'users');

module.exports = User;