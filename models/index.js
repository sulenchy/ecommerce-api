const connection = require('../database/config')

let db = {};

/**
 * @description - selects item from product table
 * @param {*} page - the page number
 * @param {*} limit - the number of items to return per page
 */
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

/**
 * @description - gets an item by product_id
 * @param {*} product_id - The id of the product
 */
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


/**
 * @description - gets items based on a given category
 * @param {*} cat_id - the id of the category
 */
db.product_category_id = (cat_id, page, limit) => {
    return new Promise((resolve, reject) => {
        if(page === undefined || page < 1){
            page = 0;
        }
        if(limit === undefined){
            limit = 20;
        }
        connection.query(`select * from product where product_id in (select product_id from product_category where category_id=${cat_id}) limit ${limit} offset ${limit * page}`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

/**
 * @description - gets items from shopping cart based on id
 * @param {*} id - the id of the cart item
 */
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

/**
 * @description - gets items based on a given department
 * @param {*} depart_id - the id of the department
 */
db.product_department_id = (depart_id, page, limit) => {
    return new Promise((resolve, reject) => {
        if(page === undefined || page < 1){
            page = 0;
        }
        if(limit === undefined){
            limit = 20;
        }
        connection.query(`select * from product where product_id in (select product_id from product_category where category_id in (select category_id from category where department_id = ${depart_id})) limit ${limit} offset ${limit * page}`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

/**
 * @description - adds new item to the product table
 * @param {*} cart_id 
 * @param {*} product_id 
 * @param {*} attributes_of_product 
 * @param {*} quantity 
 * @param {*} buy_now 
 */
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

/**
 * @description - creates new user or customer
 * @param {*} name 
 * @param {*} email 
 * @param {*} password 
 */
db.register_customer = ( name, email, password) => {
    return new Promise((resolve, reject) => {
        connection.query(`insert into customer(name, email, password) values('${name}', '${email}', '${password}')`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

/**
 * @description - creates new order for a user
 * @param {*} total_amount 
 * @param {*} status 
 * @param {*} tax_id 
 */
db.create_order = ( total_amount, status, tax_id, shipping_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`insert into orders(total_amount, created_on, status, tax_id, shipping_id) values('${total_amount}', Now() , ${status}, ${tax_id}, ${shipping_id})`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

/**
 * @description - gets customer by customer id
 * @param {*} id 
 */
db.get_order_by_id = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from orders where order_id = ${id}`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}


/**
 * @description - gets customer by customer id
 * @param {*} id 
 */
db.get_customer_by_id = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from customer where customer_id = ${id}`, (err, result) => {
            if(err){
                return reject(err);
            }
            delete result[0]["password"];
            return resolve(result);
        })
    })
}
/**
 * @description - gets customer by customer id
 * @param {*} id 
 */
db.get_customer_by_id = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from customer where customer_id = ${id}`, (err, result) => {
            if(err){
                return reject(err);
            }
            delete result[0]["password"];
            return resolve(result);
        })
    })
}

db.get_customer_by_email = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from customer where email = '${email}'`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}


/**
 * @description - updates the phone numbers of a given customer
 * @param {*} id 
 * @param {*} name 
 * @param {*} email 
 * @param {*} day_phone 
 * @param {*} eve_phone 
 * @param {*} mob_phone 
 */
db.update_customer_phone = (id,name, email,day_phone, eve_phone,mob_phone) => {
    return new Promise((resolve, reject) => {
        connection.query(`update customer set name='${name}', email='${email}', day_phone='${day_phone}', eve_phone='${eve_phone}', mob_phone='${mob_phone}' where customer_id=${id}`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

/**
 * @description - Update the address of a given customer
 * @param {*} id 
 * @param {*} addr1 
 * @param {*} addr2 
 * @param {*} city 
 * @param {*} region 
 * @param {*} postal_code 
 */
db.update_customer_address = (id,addr1, addr2,city, region,postal_code) => {
    return new Promise((resolve, reject) => {
        connection.query(`update customer set address_1='${addr1}', address_2='${addr2}', city='${city}', region='${region}', postal_code='${postal_code}' where customer_id=${id}`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

/**
 * @description - update the credit card info of a given customer
 * @param {*} id 
 * @param {*} credit_card 
 */
db.update_customer_credit_card = (id,credit_card) => {
    return new Promise((resolve, reject) => {
        connection.query(`update customer set credit_card='${credit_card}' where customer_id=${id}`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}


/**
 * @description - searches product using name or description of the product
 * @param {*} query_string 
 */
db.search_product_by_name_desc = (query_string, page, limit) => {
    if(page === undefined || page < 1){
        page = 0;
    }
    if(limit === undefined){
        limit = 20;
    }
    return new Promise((resolve, reject) => {
        connection.query(`select * from product where name like '%${query_string}%' or description like '%${query_string}%' limit ${limit} offset ${limit * page}`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}


module.exports = db;