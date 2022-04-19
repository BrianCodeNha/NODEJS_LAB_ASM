
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema ({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model('Product', productSchema);


// const getDb = require("../util/database").getDb;
// const mongodb = require("mongodb")
// class Product {
//   constructor(title, description, price, imageUrl, _id, userId) {
//     this.title = title;
//     this.description = description;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this._id = _id ? new mongodb.ObjectId(_id) : null; // khi them mongodb .ObjectId() giá trị this id luôn tồn tại, do đó phải thêm logic vào, vô cùng cẩn thận.
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;  
//     if (this._id) {
//       //update product
//       dbOp = db.collection("products").updateOne({_id: this._id}, {$set: this})
//     } else {
//       dbOp = db.collection("products").insertOne(this)
//     }
//     return dbOp      
//       .then((result) => {
//         console.log("resP", result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findById(prodid) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(prodid) })
//       .next()
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static deleteById(id) {
//     const db = getDb();
//     return db
//     .collection('products')
//     .deleteOne({_id: mongodb.ObjectId(id)})
//     .then((result) => {
//       console.log('deleted');
//     }).catch((err) => {console.log(err);})
//   }
// }

// module.exports = Product;
