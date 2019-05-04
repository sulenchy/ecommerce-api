const db = require('../models');
const  bcrypt  =  require('bcryptjs'); 
const { validationResult } = require('express-validator/check');
const checkToken = require('../middleware/checkToken');


class Customer {
    
    /**
     * @description - add new customer routes
     *  * @param req - request
     * @param res - response
     * @param next - 
     */
    static async register_customer (req,res,next) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ 
                    "status": 422,
                    "code": "USR_02",
                    errors: errors.array() 
                });
            }
            const name = req.body.name;
            const email = req.body.email;
            const password = bcrypt.hashSync(req.body.password);
            let result = await db.register_customer(name, email, password);
            const token = checkToken.accessToken(result.insertId);
            result = await db.get_customer_by_id(result.insertId)
            res.status(201).json(
                {
                    result,
                    accessToken: token,
                    expiredIn: '24h'
                })
        } catch(exception) {
            res.status(400).json({
                code: "USR_02",
                status: 409,
                message: 'Sorry, email has been used by an existing user.',
              })
        }
    }

    /**
     * @description - login routes
     *  * @param req - request
     * @param res - response
     * @param next - 
     */
    static async login_customer (req,res,next) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ 
                    "status": 422,
                    "code": "USR_02",
                    errors: errors.array() 
                });
            }
            const email = req.body.email;
            const password = req.body.password;
            let result = await db.get_customer_by_email(email);
            if(!bcrypt.compareSync(password, result[0].password)){
                return res.status(401).json({
                    status: 401,
                    code: 'USR_01',
                    message: 'Password is invalid'
                });
            }
            else {
                const token = checkToken.accessToken(result[0].customer_id);
            res.status(200).json(
                {
                    result,
                    accessToken: token,
                    expiredIn: '24h'
                })
            }
            
        } catch(exception) {
            res.status(400).json({
                code: "USR_01",
                status: 400,
                message: 'User cannot be found'
              })
        }
    }

    /**
     * @description - update customer's phone numbers routes
     *  * @param req - request
     * @param res - response
     * @param next - 
     */
    static async update_customer_phone_info (req,res,next) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ 
                    "status": 422,
                    "code": "USR_02",
                    errors: errors.array() 
                });
            }
            const customer_id = req.decoded.id;
            const email = req.body.email;
            const name = req.body.name;
            const day_phone = req.body.day_phone;
            const eve_phone = req.body.eve_phone;
            const mob_phone = req.body.mob_phone;
            let result = await db.update_customer_phone(customer_id, name,email,day_phone,eve_phone, mob_phone);
            if(result.affectedRows === 1){
                result = await db.get_customer_by_id(customer_id);
                res.status(200).json(
                {
                    result
                })
            }
        } catch(exception) {
            res.status(400).json({
                status: 400,
                code: "USR_10",
                message: 'Unexpected error occured while updating customer info'
              })
        }
    }

    /**
 * @description - update customer's address route
 *  * @param req - request
 * @param res - response
 * @param next - 
 */
    static async update_customer_address_info (req,res,next){
        try{
            const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(422).json({ 
                "status": 422,
                "code": "USR_02",
                errors: errors.array()
        });
      }
            const customer_id = req.decoded.id;
            const address1 = req.body.address1;
            const address2 = req.body.address2;
            const city = req.body.city;
            const region = req.body.region;
            const postal_code = req.body.postal_code;
            let result = await db.update_customer_address(customer_id,address1,address2,city, region, postal_code);
            if(result.affectedRows === 1){
                result = await db.get_customer_by_id(customer_id);
                
                res.status(200).json(
                {
                    result
                })
            }
        } catch(exception) {
            res.status(400).json({
                status: 400,
                code: "USR_10",
                message: 'Unexpected error occured while updating address info'
              })
        }
    }

    /**
     * @description - update customer's credit card info route
     *  * @param req - request
     * @param res - response
     * @param next - 
     */
    static async update_customer_credit_card_info (req,res,next) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ 
                    "status": 422,
                    "code": "USR_02",
                    errors: errors.array()
            });
            }
            const customer_id = req.decoded.id;
            const credit_card = req.body.credit_card;
            let result = await db.update_customer_credit_card(customer_id,credit_card);
            if(result.affectedRows === 1){
                result = await db.get_customer_by_id(customer_id);
                res.status(200).json(
                {
                    result
                })
            }
        } catch(exception) {
            res.status(400).json({
                status: 400,
                code: "USR_10",
                message: 'Unexpected error occured while updating credit card'
              })
        }
    }
}
module.exports = Customer;