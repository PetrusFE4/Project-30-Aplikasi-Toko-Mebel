const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

// Route untuk menampilkan semua kategori
router.get('/', categoryController.getAllCategory);

// Route untuk menampilkan detail kategori berdasarkan ID
router.get('/:id', categoryController.getSingleCategory);

// Route untuk menambah kategori baru
router.post('/', categoryController.addNewCategory);

// Route untuk mengupdate kategori
router.put('/:id', categoryController.updateCategory);

// Route untuk menghapus kategori
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
