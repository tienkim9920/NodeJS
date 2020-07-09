var express = require('express');

var buyController = require('../Controller/buy.Controller');

var router = express.Router();

router.get('/', buyController.index);

router.get('/:id', buyController.viewProduct);

module.exports = router;