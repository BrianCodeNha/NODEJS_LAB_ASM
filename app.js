const http = require("http");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mongoose = require("mongoose");

const URI =
  "mongodb+srv://BrianNguyen:097359@cluster0.c8rh7.mongodb.net/asm1?retryWrites=true&w=majority";
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session); // use for store session in mongodb, can use firebase
const store = new MongoDBStore({
  uri: URI,
  collection: "sessions",
});

csrf = require("csurf");

// call model

const User = require("./models/user");
const today = new Date();

// setup routes cho website

const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/auth");

//set views for app

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));


app.use( // cài dat session --> có thể dùng req.session
  session({
    secret: "this is my first secret",
    resave: false,
    unIntialize: false,
    store: store
  })
);
app.use(bodyParser.urlencoded({ extended: true })); // encoded body req and create static path to public folder
app.use(express.static(path.join(__dirname, "public")));

// set routes for app

app.use((req, res, next) => {
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => {
      console.error(error);
    });
});

app.use(authRoutes);
app.use(employeeRoutes);

const server = http.createServer(app);

mongoose
  .connect(URI)
  .then(() => {
    server.listen(process.env.PORT || 8080, '0.0.0.0', () => {
      console.log('server is running')
    });
  })
  .catch((err) => {
    console.error(err);
  });
