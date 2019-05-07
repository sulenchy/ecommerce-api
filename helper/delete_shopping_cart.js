const db = require('../models/index');
const connection = require('../database/config')

/**
 * @description - delete some cart in the 
 */
const delete_shopping_cart = () => {
    return new Promise((resolve, reject) =>{
        connection.query(`delete from shopping_cart where datediff(Now(), added_on) >= 2`, (err, result) => {
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

module.exports = delete_shopping_cart;