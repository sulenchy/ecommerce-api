
var mysql = require('mysql');
var dotenv = require('dotenv');

dotenv.config()

var connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'ecommerceApiDB',
    insecureAuth: true
});

let db = {};
db.all = () => {

    return new Promise((resolve, reject) => {
        connection.query('select * from product', (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
};

module.exports = db;