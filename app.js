// SETUP expressjs

const express = require('express')

const adminRouter = require('./routes/admin')

const shopRouter = require('./routes/shop')

const app = express();
const bodyParser = require('body-Parser');
// create middleware 

app.use(bodyParser.urlencoded({extends: false}))

app.use(adminRouter);

app.use(shopRouter)



// creater server from http, có tham số là một function (resquest, response)

app.listen(3000)
