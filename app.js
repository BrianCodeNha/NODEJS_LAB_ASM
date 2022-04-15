// SETUP expressjs

const path = require('path');
const express = require('express')

// setup các đường dẫn phụ 
const adminRoute = require('./routes/admin')
const shopRouter = require('./routes/shop')

// setup object biên dịch data từ body của request/response

const bodyParser = require('body-Parser');

const errorController = require('./controllers/errors')

// add the way to show data on views
const app = express(); //cài đặt app dưới dạng express function

app.set('view engine', 'ejs') // da cai dat pug/ejs trong dependencies - cài đặt định dạng cho content động
app.set('views', 'views') // tìm viewTemplate trong folder views



// create middleware 

app.use(bodyParser.urlencoded({extends: false})) // look at the request where header: 'Content-Type': urlencoded, extends: false không cho phép loại data khác trừ string
app.use(express.static(path.join(__dirname, 'public'))) // cho phép browser load trực tiếp file từ folder public

app.use('/admin',adminRoute);
app.use(shopRouter)

app.use(errorController.get404)

// creater server from http, có tham số là một function (resquest, response)

app.listen(3000)
