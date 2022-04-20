const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.send('<h1>Welcome!</h1>');
})

const server = http.createServer(app);

server.listen(3000);