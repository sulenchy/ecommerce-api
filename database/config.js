
var mysql = require('mysql');
var dotenv = require('dotenv');

dotenv.config()

// create a pool of database conncetions
let connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'ecommerceApiDB',
    insecureAuth: true
});

module.exports = connection;