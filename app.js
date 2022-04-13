// SETUP expressjs

const express = require('express')

const adminRouter = require('./routes/admin')

const shopRouter = require('./routes/shop')

const app = express();
const bodyParser = require('body-Parser');
// create middleware 

app.use(bodyParser.urlencoded({extends: false}))

app.use('/admin',adminRouter);
app.use('/shop',shopRouter)

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>')
})

// creater server from http, có tham số là một function (resquest, response)

app.listen(3000)
