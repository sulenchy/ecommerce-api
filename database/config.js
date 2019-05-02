
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
        connection.query(`select * from product where product_id in (select product_id from product_category where category_id=${cat_id})`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

db.get_shopping_cart_by_id = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`select item_id, name, attributes, price, quantity, (quantity * price) as sub_total, secondTable.product_id from (select name, price, product_id from product where product_id in (select product_id from shopping_cart where item_id=${id})) as firstTable inner join (select * from shopping_cart where item_id=${id}) as secondTable on firstTable.product_id = secondTable.product_id`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

db.product_department_id = (depart_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from product where product_id in (select product_id from product_category where category_id in (select category_id from category where department_id = ${depart_id}))`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}
db.add_product_to_shopping_cart = (cart_id, product_id, attributes_of_product, quantity, buy_now) => {
    return new Promise((resolve, reject) => {
        connection.query(`insert into shopping_cart(cart_id, product_id, attributes, quantity, buy_now, added_on) values(${cart_id},${product_id},'${attributes_of_product}',${quantity},${buy_now},Now())`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

db.search_product_by_name_desc = (query_string) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from product where name like '%${query_string}%' or description like '%${query_string}%' `, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}


module.exports = db;