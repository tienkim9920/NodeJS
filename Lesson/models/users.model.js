var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        name: String,
        phone: String,
        email: String,
        passWord: String,
        avatar: String
    }
);

var User = mongoose.model('User', schema, 'users');

module.exports = User;