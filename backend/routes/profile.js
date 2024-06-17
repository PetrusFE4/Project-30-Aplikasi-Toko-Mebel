const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth'); // Update import ke auth

// Gunakan middleware auth untuk memeriksa keaslian token
router.use(auth);

// Rute pengguna
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getSingleUser);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
