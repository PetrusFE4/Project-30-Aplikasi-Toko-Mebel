const express = require('express');
const router = express.Router();
const userController = require('../controller/userController') ;// Jika ingin merubah, maka ubah di controller

router.post('/login', userController.login);
router.post('/register', userController.register);
// READ - USER
router.get('/', userController.getAllUsers)

router.get('/:id', userController.getSingleUser); 


module.exports = router
