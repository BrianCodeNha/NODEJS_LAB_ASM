const path = require('path')

const express = require('express');

const router= express.Router();
const adminData = require('./admin')



router.get('/',(req, res, next) => {    

    res.render('shop', {prods: adminData.products, pageTitle: 'Shop', path: '/', hasProduct: adminData.products.length > 0})
})


module.exports = router;