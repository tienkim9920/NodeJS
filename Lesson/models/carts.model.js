var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        idUser: String,
        idProduct: String,
        name: String,
        price: Number,
        status: Boolean,
        img: String,
        count: Number
    }
);

var Cart = mongoose.model('Cart', schema, 'carts');

module.exports = Cart;