// goi globa module http

const http = require("http");

// SETUP expressjs

const express = require('express')

const app = express();

// create middleware

app.use((req, res, next) => {
    console.log('this is a middleware');    
    next();
})

app.use((req, res, next) => {
    console.log('this is the second middleware');
    res.send('<h1>Hello from Express.js</h1>')
})


// creater server from http, có tham số là một function (resquest, response)

const server = http.createServer(app);

server.listen(3000)
