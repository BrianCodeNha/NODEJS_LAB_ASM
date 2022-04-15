const rootDir  = require('../ulti/path')

const path = require('path')
const productsControllers = require('../controllers/products')

const express  = require('express');

// router dung tương tự expressjs
const router = express.Router();

// Method GET, url /admin/add-product

router.get('/add-product', productsControllers.getAddProductPage)

// method POST, URL /admin/product

router.post('/product', productsControllers.postProduct)

module.exports = router;