const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);
// Rute untuk mendapatkan profil pengguna
router.get('/',  profileController.getProfile);

// Rute untuk memperbarui profil pengguna
router.put('/edit', profileController.updateProfile);

module.exports = router;
