// SETUP expressjs

const express = require('express')

const app = express();
const bodyParser = require('body-Parser');
// create middleware 

app.use(bodyParser.urlencoded({extends: false}))

app.use('/add-products',(req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title" /><button type="submit">Send</button></form>')
})

app.use('/product', (req, res, next) => {

    console.log('product title', req.body)
    res.redirect('/')
})


app.use('/',(req, res, next) => {
    console.log('this is the second middleware'); 
    res.send('<h1>Hello from Express.js</h1>')
})



// creater server from http, có tham số là một function (resquest, response)

app.listen(3000)
