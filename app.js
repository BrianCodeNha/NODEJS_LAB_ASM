// SETUP expressjs

const path = require('path');

const express = require('express')

const adminRouter = require('./routes/admin')

const shopRouter = require('./routes/shop')

const app = express();
const bodyParser = require('body-Parser');
// create middleware 

app.use(bodyParser.urlencoded({extends: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminRouter);
app.use(shopRouter)

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

// creater server from http, có tham số là một function (resquest, response)

app.listen(3000)
