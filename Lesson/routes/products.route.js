var express = require('express');

var productController = require("../Controller/products.Controller");
var userMiddleware = require('../middleware/auth.middleware');

var router = express.Router();

router.get('/', userMiddleware.CheckMiddle, productController.index);

module.exports = router;