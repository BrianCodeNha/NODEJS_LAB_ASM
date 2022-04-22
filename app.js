const http = require("http");
const path = require("path");
const date = require("date-and-time");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mongoose = require("mongoose");

// call model

const User = require("./models/user");
const today = new Date();


// setup routes cho website

const employeeRoutes = require("./routes/employeeRoutes");

//set views for app

app.set("view engine", "ejs");
app.set("views", "views");

// encoded body req and create static path to public folder

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// set routes for app

app.use((req, res, next) => {
  User.findById('6262c8c62f26c34091196a6c')
    .then((user) => {
      req.user = user;
      next();
    })    
    .catch((error) => {
      console.error(error);
    });
});

app.use(employeeRoutes);

const server = http.createServer(app);

mongoose
  .connect(
    "mongodb+srv://BrianNguyen:097359@cluster0.c8rh7.mongodb.net/asm1?retryWrites=true&w=majority"
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const datett = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()
        // khởi tạo user nếu chưa có
        const user = new User({
          working: false,
          name: "Nguyễn Minh Chí",
          doB: "01/01/2000",
          salaryScale: 2,
          startDate: "01/01/2022",
          department: "IT",
          annualLeave: 2,
          imageUrl:
            "https://icdn.dantri.com.vn/thumb_w/640/2019/12/20/diem-danh-12-hot-boy-noi-bat-nhat-1-nam-quadocx-1576851098388.jpeg",
          session: {
            sessionDuration: 0,
            history: {
              date: '2022',
              startTime: null,
              endTime: null,
              duration: 0,
              location: null,
            },
          },
        });
        
        user.save();
      }
      
        
      console.log("🚀 ~ file: app.js ~ line 41 ~ User.findOne ~ user", user);
    });

    server.listen(3000);
  })
  .catch((err) => {
    console.error(err);
  });
