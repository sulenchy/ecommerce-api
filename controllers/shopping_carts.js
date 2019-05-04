const db = require('../models/index');
const { validationResult } = require('express-validator/check');



class Shopping_Cart {

    /**
 * @description - add item to cart routes
 *  * @param req - request
 * @param res - response
 * @param next - 
 * 
 */
    static async add_item_to_cart (req,res,next) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ 
                    "status": 422,
                    "code": "SPC_02",
                    errors: errors.array() 
                });
            }
            const cart_id = req.body.cart_id;
            const product_id = req.body.product_id;
            const attributes = req.body.attributes;
            const quantity = req.body.quantity;
            const buy_now = req.body.buy_now;
            let result = await db.add_product_to_shopping_cart(cart_id,product_id,attributes,quantity,buy_now);
            result = await db.get_shopping_cart_by_id(result.insertId);
            res.status(201).json(
                result)
        } catch(exception) {
            res.status(400).json({
                code: "SPC_01",
                status: 400,
                message: 'Shopping cart cannot be added'
              })
        }
    }

}

module.exports = Shopping_Cart