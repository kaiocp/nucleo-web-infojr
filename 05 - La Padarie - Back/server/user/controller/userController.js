const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

router.get('/', userService.getAllUsers);
router.get('/:id', userService.getUserById);

router.post('/', userService.createUser);

router.delete('/:id', userService.deleteUser);



module.exports = router;