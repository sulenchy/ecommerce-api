const express = require('express');
const router = express.Router()
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs'); 

const db = require('../database/config');
const checkToken = require('../helper/checkToken');

/**
 * @description - gets all products
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

router.post('/shoppingcart/add', async(req,res,next) => {
    try{
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
            code: "PRD_02",
            status: 400,
            message: exception
          })
    }
})


const  accessToken = (customerId) =>{
    return jwt.sign({ id: customerId }, 'hgjhn', {
        expiresIn:  '24h'
    });
}

router.post('/customers', async(req,res,next) => {
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = bcrypt.hashSync(req.body.password);
        let result = await db.register_customer(name, email, password);
        const token = accessToken(result.insertId);
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
            message: exception
          })
    }
})
router.post('/customers/login', async(req,res,next) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        let result = await db.get_customer_by_email(email);
        if(!bcrypt.compareSync(password, result[0].password)){
            return res.status(401).send('Password not valid!');
        }
        else {
            const token = accessToken(result[0].customer_id);
        res.status(200).json(
            {
                result,
                accessToken: token,
                expiredIn: '24h'
            })
        }
        
    } catch(exception) {
        res.status(400).json({
            code: "usr_02",
            status: 400,
            message: exception
          })
    }
})

router.put('/customer', checkToken.checkToken, async(req,res,next) => {
    try{
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
            code: "usr_02",
            status: 400,
            message: exception
          })
    }
})

router.put('/customers/address', checkToken.checkToken, async(req,res,next) => {
    try{
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
            code: "usr_02",
            status: 400,
            message: exception
          })
    }
})


router.put('/customers/creditCard', checkToken.checkToken, async(req,res,next) => {
    try{
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
            code: "usr_02",
            status: 400,
            message: exception
          })
    }
})


module.exports = router;