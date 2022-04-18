const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://BrianNguyen:097359@cluster0.c8rh7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connected");
      callback(client);
    })
    .catch((error) => {
      console.log(error);
    });
};


module.exports = mongoConnect;