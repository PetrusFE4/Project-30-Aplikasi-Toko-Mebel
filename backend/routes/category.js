const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController')

router.get('/', categoryController.getAllCategory);
router.get('/:id', categoryController.getSingleCategory); 

router.post('/add', categoryController.addNewCategory);

router.put('/edit', categoryController.updateCategory);

router.delete('/delete', categoryController.deleteCategory);

module.exports = router;