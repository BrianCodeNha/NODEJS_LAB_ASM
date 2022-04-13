const rootDir  = require('../ulti/path')

const path = require('path')

const express  = require('express');

const router = express.Router();

// Method GET, url /admin/add-product

router.get('/add-product',(req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Product Choi'})
})

// method POST, URL /admin/product

const products = [];

router.post('/product', (req, res, next) => {
    products.push({title: req.body.title})
    console.log('product data', products)
    res.redirect('/')
})

exports.routes = router;
exports.products = products;