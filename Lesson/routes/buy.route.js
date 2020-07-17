var express = require('express');

var buyController = require('../Controller/buy.Controller');

var router = express.Router();

router.get('/', buyController.index);

router.get('/:id', buyController.viewProduct);

router.get('/shows/:id', buyController.shows);

router.post('/add/cart/:id', buyController.addCart);

router.post('/delete/:id', buyController.deleteProduct);

router.get('/search/:id', buyController.search);

module.exports = router;