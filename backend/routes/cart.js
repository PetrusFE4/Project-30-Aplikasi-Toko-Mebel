const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const authMiddleware = require('../middleware/auth');
const authRole = require('../middleware/authRole');

// Gunakan middleware auth untuk memeriksa keaslian token
router.use(authMiddleware);

// Rute-rute yang membutuhkan role pengguna tertentu untuk akses
router.post('/add', authRole('user'), cartController.addToCart);
router.get('/', authRole('user'), cartController.getCart);
router.get('/:id_cart', authRole('user'), cartController.getSingleCart);
router.put('/:id_cart', authRole('user'), cartController.updateCart);
router.delete('/', authRole('user'), cartController.deleteCart);
router.delete('/:id_cart', authRole('user'), cartController.deleteCartItem);

module.exports = router;
