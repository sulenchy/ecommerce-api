const db = require('../models/index');
const sendMail = require('../helper/sendMail');
const { validationResult } = require('express-validator/check');


class Orders {

    /**
     * @description - create new order
     * @param req - request
     * @param res - response
     * @param next - 
     */
    static async create_order (req,res,next) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ 
                    "status": 422,
                    "code": "ORD_01",
                    errors: errors.array() 
                });
            }
            
            const total_amount = req.body.total_amount;
            const customer_id = req.decoded.id;
            
            // TODO: include cart_id

            const shipping_id = req.body.shipping_id;
            // const cart_id = req.body.cart_id;
            const status = 1;
            const tax_id = req.body.tax_id;
            let result = await db.create_order(total_amount, status, tax_id, shipping_id);
            const order_id = result.insertId
            result = await db.get_order_by_id(order_id)
            const customer = await db.get_customer_by_id(customer_id);
            sendMail(customer[0].email, order_id);
            res.status(201).json(
                {
                    result,
                })
        } catch(exception) {
            res.status(409).json({
                code: "ORD_02",
                status: 409,
                message: 'Order cannot be inserted',
                exception
              })
        }
    }
}


module.exports = Orders