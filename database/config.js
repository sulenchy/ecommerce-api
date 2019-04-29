
var mysql = require('mysql');
var dotenv = require('dotenv');

dotenv.config()

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'ecommerceApiDB',
    insecureAuth: true
});

connection.connect((err, result) => {
    if(err) {
        console.log('mysql err', err)
    } else{
        console.log('mysql connected',result);
    }
});

module.exports = connection;