const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart (product) {
    // const cartProduct = this.cart.items.findIndex(cp => cp._id === product._id);
    const updatedCart = {item: [{productId: product._id, quantity: 1}]};
    const db = getDb();
    return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart}})
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
