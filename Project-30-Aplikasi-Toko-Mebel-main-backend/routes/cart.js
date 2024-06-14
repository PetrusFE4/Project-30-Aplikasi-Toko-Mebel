const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const userController = require('../controller/userController');
const verifyToken = require('../middleware/verifyToken');

router.post('/login', userController.login);
router.use(verifyToken);
router.post('/add', cartController.addToCart);
router.get('/', cartController.getCart);
router.get('/:id', cartController.getSingleCart); 
router.put('/update', verifyToken, cartController.updateCart);
router.delete('/delete', verifyToken, cartController.deleteCart);

// Tambahkan rute untuk menghapus item spesifik dari keranjang
router.delete('/delete-item', verifyToken, cartController.deleteCartItem);

module.exports = router;
