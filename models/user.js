const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
        quantity: { type: Number, required: true},
      },
    ],
  },
});

module.exports = mongoose.model('User', userSchema)

// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

// class User {
//   constructor(name, email, cart, id) {
//     this.name = name;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     return db.collection("users").insertOne(this);
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.item.findIndex((cp) => {
//       return cp.productId.toString() === product._id.toString();
//     });
//     let newQuantity = 1;
//     const updatedCartItem = [...this.cart.item];

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.item[cartProductIndex].quantity + 1;
//       updatedCartItem[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItem.push({
//         productId: new mongodb.ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }

//     const updatedCart = {
//       item: updatedCartItem,
//     };
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           item: products,
//           user: {
//             _id: new mongodb.ObjectId(this._id),
//             name: this.name,
//           },
//         };
//         return db.collection("orders").insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { item: [] };
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: { cart: { item: [] } } }
//           );
//       });
//   }

//   getOrders() {
//     const db = getDb();
//     return db.collection("orders").find({ "user._id": this._id }).toArray();
//   }

//   getCart() {
//     const db = getDb();
//     const cartProductIdList = this.cart.item.map((i) => i.productId);

//     return db
//       .collection("products")
//       .find({ _id: { $in: cartProductIdList } })
//       .toArray()
//       .then((products) => {
//         return products.map((p) => {
//           return {
//             ...p,
//             quantity: this.cart.item.find(
//               (i) => i.productId.toString() === p._id.toString()
//             ).quantity,
//           };
//         });
//       })
//       .catch((error) => console.log(error));
//   }

//   deleteItemFromCart(productId) {
//     const db = getDb();
//     const updatedCartItem = this.cart.item.filter(
//       (p) => p.productId.toString() !== productId.toString()
//     );
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: { item: updatedCartItem } } }
//       );
//   }

//   static findUserById(id) {
//     const db = getDb();
//     return db
//       .collection("users")
//       .findOne({ _id: new mongodb.ObjectId(id) })
//       .then((user) => {
//         console.log(user);
//         return user;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// }

// module.exports = User;
