const express = require('express');
const router = express.Router();
const productController = require('../controller/productController')

router.get('/', productController.getAllProduct);
router.get('/:id', productController.getSingleProduct); 

router.post('/add', productController.addNewProduct);

router.put('/edit', productController.updateProduct);

router.delete('/delete', productController.deleteProduct);

module.exports = router;
