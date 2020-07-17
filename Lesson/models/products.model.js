var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        name: String,
        price: Number,
        status: Boolean,
        img: String,
        count: Number
    }
);

var Product = mongoose.model('Product', schema, 'products');

module.exports = Product;