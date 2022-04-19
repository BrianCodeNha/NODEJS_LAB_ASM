const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(name, email, cart) {
    this.name = name;
    this.email = email;
    this.cart = cart;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart (product) {
    const cartProduct = this.cart.items.findIndex(cp => cp._id === product._id);
  }

  static findUserById(id) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(id) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = User;
