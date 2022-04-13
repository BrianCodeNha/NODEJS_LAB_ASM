const rootDir  = require('../ulti/path')

const path = require('path')

const { Router } = require('express');
const express  = require('express');

const router = express.Router();

// Method GET, url /admin/add-product

router.get('/add-product',(req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
})

// method POST, URL /admin/product

const productData = [];

router.post('/product', (req, res, next) => {
    productData.push(req.body.title)
    console.log('product data', productData)
    res.redirect('/')
})

module.exports = router;