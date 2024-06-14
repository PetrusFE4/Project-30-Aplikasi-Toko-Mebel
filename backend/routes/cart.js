const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const verifyToken = require('../middleware/verifyToken');

router.post('/add', verifyToken, cartController.addToCart);
router.get('/', verifyToken, cartController.getCart);
router.put('/update', verifyToken, cartController.updateCart);
router.delete('/delete', verifyToken, cartController.deleteCart);

// Tambahkan rute untuk menghapus item spesifik dari keranjang
router.delete('/delete-item', verifyToken, cartController.deleteCartItem);

module.exports = router;
