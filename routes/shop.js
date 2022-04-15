const path = require('path')

const express = require('express');

const router= express.Router();
const productsControllers = require('../controllers/products')


router.get('/', productsControllers.getProduct)


module.exports = router;