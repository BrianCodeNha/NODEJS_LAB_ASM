const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db; // _ là dấu hiệu cho thấy chỉ dùng trong nội bộ file này không exports ra file khác ~ private keyword

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://BrianNguyen:097359@cluster0.c8rh7.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connected");
      _db = client.db()
      callback();
    })
    .catch((error) => {
      console.log(error);
      throw error
    });
};

const getDb = () => {
  if (_db){
    return _db;
  }
  throw 'No database found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;