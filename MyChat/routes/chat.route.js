var express = require('express');

var chatController = require('../Controller/chat.controller');

var router = express.Router();

router.post('/', chatController.index);

module.exports = router;