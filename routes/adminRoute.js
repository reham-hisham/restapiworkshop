const router = require('express').Router()
const adminController = require('../mongoose/controllers/adminController')
const adminAuth = require('../middleware/adminAuth')
router.post('/addProduct', adminAuth, adminController.addProduct)


module.exports = router