const express = require('express');
const router = express.Router();
const userController = require('../controller/userController') ;// Jika ingin merubah, maka ubah di controller

router.post('/login', userController.login);
// READ - USER
router.get('/', userController.getAllUsers)

router.get('/:id', userController.getSingleUser); 
// CREATE - USER
router.post('/add', userController.createNewUser)

router.put('/edit', userController.updateUser)

router.delete('/delete', userController.deleteUser)

module.exports = router
