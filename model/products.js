

const fs = require('fs');

const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'products.json')

const getProductFromFile = (cb) => {
    fs.readFile(p, (err, fileContents) => {
        if(err) {
            return cb([])
        }
        cb(JSON.parse(fileContents));
    })
}

module.exports = class Product {    

    constructor(title) {
        this.title = title;
    }

    save() {
        getProductFromFile(products => {
            products.push(this) // thêm object mới vào
            fs.writeFile(p, JSON.stringify(products), (err) => { console.log(err)})
        })       
  
    }

   static fetchAll(cb) {
    getProductFromFile(cb);
    }
}