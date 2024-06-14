const express = require('express')
const router = express.Router()
const adminController = require('../controller/adminController')


router.get('/', adminController.getAllAdmin)
router.get('/:id', adminController.getSingleAdmin); 

router.post('/add', adminController.createNewAdmin)

router.put('/edit', adminController.updateAdmin)

router.delete('/delete', adminController.deleteAdmin)

module.exports = router
