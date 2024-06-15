const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

// Route untuk menampilkan semua produk
router.get('/', productController.getAllProduct);

router.get('/:id_product', productController.getSingleProduct);

// Route untuk menampilkan produk berdasarkan kategori
router.get('/category/:category_name', productController.getProductsByCategory);

// Route untuk menambah produk baru
router.post('/', productController.addNewProduct);

// Route untuk mengupdate produk
router.put('/:id_product', productController.updateProduct);

// Route untuk menghapus produk
router.delete('/:id_product', productController.deleteProduct);

module.exports = router;
