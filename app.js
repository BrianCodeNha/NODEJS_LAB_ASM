// goi globa module http

const http = require("http");

const fs = require('fs')

const routes = require('./routes')

console.log(routes.someText)

// creater server from http, có tham số là một function (resquest, response)

const server = http.createServer(routes.handler);

server.listen(3000)
