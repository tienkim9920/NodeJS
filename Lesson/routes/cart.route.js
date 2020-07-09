var express = require('express');

var cartController = require('../Controller/cart.Controller');

var router = express.Router();

router.get('/add/:id', cartController.addCart);

module.exports = router;