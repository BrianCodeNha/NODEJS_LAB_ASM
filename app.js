const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    User.findById(1).then((user) => {
        req.user = user; // store sequelize object in request and can get all method of sequelize object like destroy
        next(); // we will get the user in req whenever start the app.
    })
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product) // phải có relation này mới thêm được function createProduct và getProducts

sequelize
  .sync({ force: true }) // ghi de len du lieu bảng cũ, sau khi app hoàn thiện thì xoá đi, để không bị ghi đè lên nữa
  .then((result) => {
    return User.findById(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
