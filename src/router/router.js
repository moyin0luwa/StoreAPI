const router = require('express').Router()
const {getAllProductsStatic, getAllProducts} = require('../controllers/product')

router.get('/', getAllProducts)
router.get('/static', getAllProductsStatic)

module.exports = router