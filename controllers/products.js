

const Product = require('../model/products')

exports.getAddProductPage = (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Product Choi', path: '/admin/add-product'})
}

exports.postProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/')
}

exports.getProduct = (req, res, next) => {  
    const productt = Product.fetchAll(products => {
        res.render('shop', {prods: products, pageTitle: 'Shop', path: '/', hasProduct: products.length > 0})
    });
    
}
