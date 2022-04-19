const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById('625eeb7048a3e1dab4132ccf')
    .then((user) => {
      req.user = user;
      next(); // chỉ để next ở đây, để bên dưới sẽ bị lỗi undefined user
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://BrianNguyen:097359@cluster0.c8rh7.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    User.findOne().then(user => {
      if(!user){
        const user = new User({
          name: 'admin',
          email: 'admin@test.com',
          cart: {
            items: []
          }
        })
        user.save();
      }
    })
    app.listen(3000);
  })
  .catch((err) => console.log(err));


