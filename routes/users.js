const express = require('express')
const router = express.Router()
const userController = require('../controller/userController') // Jika ingin merubah, maka ubah di controller

// READ - USER
router.get('/', userController.getAllUsers)

// CREATE - USER
router.post('/add', userController.createNewUser)

router.put('/edit', userController.updateUser)

router.delete('/delete', userController.deleteUser)

module.exports = router
