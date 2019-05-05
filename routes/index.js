const express = require('express');
const router = express.Router()
// const { validationResult } = require('express-validator/check');
// const  bcrypt  =  require('bcryptjs'); 


// const db = require('../models/index');
// const checkToken = require('../middleware/checkToken');
// const sendMail = require('../helper/sendMail');
// const validate = require('../middleware/validate');
const products = require('./products');
const shopping_cart = require('./shopping_carts');
const customers = require('./customers');
const orders = require('./orders');
const stripe = require('./stripe');



router.use(products);
router.use(shopping_cart);
router.use(customers);
router.use(orders);
router.use(stripe)


module.exports = router;