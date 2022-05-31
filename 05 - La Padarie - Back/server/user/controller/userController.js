const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

router.get('/', userService.getAllUsers);

router.post('/', userService.createUser);

module.exports = router;