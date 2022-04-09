// goi globa module http

const http = require("http");

// creater server from http, có tham số là một function (resquest, response)

const server = http.createServer((req, res) => {
    console.log(req.url, req.headers, req.method)
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First App</title></head>");
  res.write("<body><h1>Hello from my Node.js Server</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000)
