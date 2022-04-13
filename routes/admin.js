const { Router } = require('express');
const express  = require('express');

const router = express.Router();

// Method GET, url /admin/add-product

router.get('/add-products',(req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title" /><button type="submit">Send</button></form>')
})

// method POST, URL /admin/product

router.post('/product', (req, res, next) => {

    console.log('product title', req.body)
    res.redirect('/')
})

module.exports = router;