
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
db.products = (page, limit) => {
    if(page === undefined || page < 1){
        page = 0;
    }
    if(limit === undefined){
        limit = 20;
    }
    return new Promise((resolve, reject) => {
        connection.query(`select * from product limit ${limit} offset ${limit * page}`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
};

db.product_by_id = (product_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from product where product_id = ${product_id}`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
};

db.product_category_id = (cat_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from product_category where category_id=${cat_id}`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}


module.exports = db;