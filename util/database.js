const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: '097359'
})

module.exports = pool.promise();