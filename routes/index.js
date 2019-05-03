const express = require('express');
const router = express.Router()
const  jwt  =  require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const  bcrypt  =  require('bcryptjs'); 
const stripe = require("stripe")("sk_test_lomdOfxbm7QDgZWvR82UhV6D");

const db = require('../database/config');
const checkToken = require('../helper/checkToken');
const sendMail = require('../helper/sendMail');
const validate = require('../helper/validate');


/**
 * @description - gets all products routes
 * 
 * @param req - request
 * @param res - response
 * @param next - 
 */
router.get('/products', async(req, res, next) => {
    try{
        //queries params
        const page = req.query.page;
        const limit = req.query.limit;

        let result = await db.products(page,limit);
        res.status(200).json({
            count: result.length,
            rows: result
        })
    }
    catch(exception){
        res.status(400).json({
            code: "PRD_01",
            status: 400,
            message: "Database error",
          })
    }
})


/**
 * @description - gets products by category route
 * @param req - request
 * @param res - response
 * @param next - 
 */
router.get('/products/inCategory/:category_id', async(req, res, next) => {
    try{
        //queries params
        const category_id = req.params.category_id;
        let result = await db.product_category_id(category_id);
        res.status(200).json({
            count: result.length,
            result
        })
    }
    catch(exception){
        res.status(400).json({
            code: "PRD_03",
            status: 400,
            message: "Error in product search by category",
          })
    }
})


/**
 * @description - get products by department routes
 *  * @param req - request
 * @param res - response
 * @param next - 
 */
router.get('/products/inDepartment/:department_id', async(req, res, next) => {
    try{
        //queries params
        const department_id = req.params.department_id;
        let result = await db.product_department_id(department_id);
        res.status(200).json({
            count: result.length,
            result
        })
    }
    catch(exception){
        res.status(400).json({
            code: "PRD_04",
            status: 400,
            message: "Error occurred in product search by department",
          })
    }
})

/**
 * @description - search products routes
 *  * @param req - request
 * @param res - response
 * @param next - 
 */
router.get('/products/search', async(req, res, next) => {
    try{
        //queries params
        const query_string = req.query.query_string;
        let result = await db.search_product_by_name_desc(query_string);
        res.status(200).json({
            count: result.length,
            result
        })
    }
    catch(exception){
        res.status(400).json({
            code: "PRD_02",
            status: 400,
            message: "",
          })
    }
})


/**
 * @description - gets products by product_id
 * 
 * @param req - request
 * @param res - response
 * @param next - 
 */
router.get('/products/:product_id', async(req, res, next) => {
    try{
        //queries params
        const product_id = req.params.product_id;
        let result = await db.product_by_id(product_id);
        res.status(200).json({
            result
        })
    }
    catch(exception){
        res.status(400).json({
            code: "PRD_02",
            status: 400,
            message: "product does not exist",
          })
    }
})

/**
 * @description - add item to cart routes
 *  * @param req - request
 * @param res - response
 * @param next - 
 * 
 */

router.post('/shoppingcart/add', validate.validate_new_shopping_cart, async(req,res,next) => {
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
})


/**
 * @description - add new customer routes
 *  * @param req - request
 * @param res - response
 * @param next - 
 */
router.post('/customers', validate.validate_customer_register, async(req,res,next) => {
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
        console.log(checkEmail, '==========>');
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
            code: "usr_02",
            status: 400,
            message: 'Customer cannot be added'
          })
    }
})

/**
 * @description - create new order
 *  * @param req - request
 * @param res - response
 * @param next - 
 */
router.post('/orders',validate.validate_orders, checkToken.checkToken, async(req,res,next) => {
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
        const status = 1;
        const tax_id = req.body.tax_id;
        let result = await db.create_order(total_amount, status, tax_id);
        const order_id = result.insertId
        result = await db.get_order_by_id(order_id)
        const customer = await db.get_customer_by_id(customer_id);
        sendMail(customer[0].email, order_id);
        res.status(201).json(
            {
                result,
            })
    } catch(exception) {
        res.status(400).json({
            code: "ORD_02",
            status: 400,
            message: 'Order cannot be inserted'
          })
    }
})

/**
 * @description - login routes
 *  * @param req - request
 * @param res - response
 * @param next - 
 */
router.post('/customers/login', validate.validate_customer_login, async(req,res,next) => {
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
})

/**
 * @description - update customer's phone numbers routes
 *  * @param req - request
 * @param res - response
 * @param next - 
 */
router.put('/customer', validate.validate_cust_basic_info ,checkToken.checkToken,  async(req,res,next) => {
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
})


/**
 * @description - update customer's address route
 *  * @param req - request
 * @param res - response
 * @param next - 
 */
router.put('/customers/address', validate.validate_cust_address_info, checkToken.checkToken, async(req,res,next) => {
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
})

/**
 * @description - update customer's credit card info route
 *  * @param req - request
 * @param res - response
 * @param next - 
 */
router.put('/customers/creditCard',validate.validate_cust_credit_card, checkToken.checkToken, async(req,res,next) => {
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
})

/**
 * @description - checkout route
 *  * @param req - request
 * @param res - response
 * @param next - 
 */
router.post('/stripe/charge', async(req, res, next) => {
    const chargeAmount = req.body.chargeAmount;
    const token = req.body.stripeToken;
    const order_id = req.body.order_id;
    const description = req.body.description;
    try{
        stripe.charges.create({
            amount: chargeAmount,
            currency: 'usd',
            metadata: {order_id},
            description: description,
            source: token
        }, (err, charge) => {
            if(err){
                return res.status(422).json({
                    status: 422,
                    code: 'STP_01',
                    message: "Error in the data submitted"
                })
            }
            sendMail()
            return res.status(201).json(
                    charge
                )
        })
        
    }
    catch(exception){
        res.status(400).json({
            code: "STP_02",
            status: 400,
            message: exception
          })
    }
})

module.exports = router;