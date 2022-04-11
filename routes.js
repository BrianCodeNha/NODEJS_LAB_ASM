
const fs = require('fs');

const handlerFetch = (req, res) => {
  if (req.url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST' ><input type='text' name='message' /><button>send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      }); //sync là dạng đồng bộ dẫn đến code block, do đó không dùng mà chuyển sang dạng bất động bộ có nghĩa là nodejs yêu cầu sever làm gì đó và để đó, sau đó thực hiện các request khác cuối cùng thì nó mới quay lại thực hiện, chứ không phải đi tuần tự
    });
  }  
  

  res.setHeader("Content-Type", "text/html"); // không dùng header vẫn load ra được trang html!!!!!
  res.write("<html>");
  res.write("<head><title>My First App</title></head>");
  res.write("<body><h1>Hello from my Node.js Server</h1></body>");
  res.write("</html>");
  res.end();
  
};

// module.exports = handlerFetch;

// module.exports = {
//     handler: handlerFetch,
//     someText: 'some hard code'
// }

// module.exports.handler = handlerFetch;
// module.exports.someText = 'some hard code'

exports.handler = handlerFetch;
exports.someText = 'some hard code';