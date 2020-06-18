var express = require('express');

var usersController = require('../Controller/users.Controller');
var userMiddleware = require('../middleware/auth.middleware');

var router = express.Router()

router.get('/', userMiddleware.CheckMiddle, usersController.index);

router.get('/create', userMiddleware.CheckMiddle, usersController.create)

router.get('/search', usersController.search);

router.get('/:id', usersController.views);

router.post('/create', usersController.createUser);

module.exports = router