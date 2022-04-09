// goi globa module http

const http = require("http");

// creater server from http, có tham số là một function (resquest, response)

const server = http.createServer((req, res) => {
    if(req.url === '/'){
  res.write("<html>");
  res.write("<head><title>Enter Message</title></head>");
  res.write("<body><form action='/mesage' method='POST'><input type='text' name='message' /><button>send</button></form></body>");
  res.write("</html>");
  return res.end();
    }
//   res.setHeader("Content-Type", "text/html"); // không dùng header vẫn load ra được trang html!!!!!
  res.write("<html>");
  res.write("<head><title>My First App</title></head>");
  res.write("<body><h1>Hello from my Node.js Server</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000)
