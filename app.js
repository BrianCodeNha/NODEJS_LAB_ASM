// SETUP expressjs

const express = require('express')

const app = express();

// create middleware 

app.use('/',(req, res, next) => {
    console.log('this is always run');     
    next();
})

app.use('/add-product',(req, res, next) => {
    console.log('this is a middleware');
    res.send('<h1>The Add product page</h1>')   
})

app.use('/',(req, res, next) => {
    console.log('this is the second middleware'); 
    res.send('<h1>Hello from Express.js</h1>')
})



// creater server from http, có tham số là một function (resquest, response)

app.listen(3000)
