// SETUP expressjs

const path = require('path');

const express = require('express')
const expressHbs = require('express-handlebars');

const adminData = require('./routes/admin')

const shopRouter = require('./routes/shop')

const app = express();
const bodyParser = require('body-Parser');

// add the way to show data on views

app.engine('hbs', expressHbs())
app.set('view engine', 'hbs') // da cai dat pug trong dependencies
app.set('views', 'views') // tìm viewTemplate trong folder views

// create middleware 

app.use(bodyParser.urlencoded({extends: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminData.routes);
app.use(shopRouter)

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found', path: '/'})
})

// creater server from http, có tham số là một function (resquest, response)

app.listen(3000)
