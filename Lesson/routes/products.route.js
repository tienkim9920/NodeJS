var express = require('express');

var productController = require("../Controller/products.Controller");

var router = express.Router();

router.get('/', productController.index);

module.exports = router;