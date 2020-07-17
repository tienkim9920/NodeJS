var express = require('express');

var authController = require('../Controller/auth.route');

var router = express.Router()

router.get('/login', authController.login);

router.post('/login', authController.postLogin);

router.get('/logout', authController.logout);

module.exports = router