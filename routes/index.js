const express = require('express');
const router = express.Router()

const products = require('./products');
const shopping_cart = require('./shopping_carts');
const customers = require('./customers');
const orders = require('./orders');
const stripe = require('./stripe');




router.get('/', (req, res) => res.json({message:'Welcome to Ecommerce API !!!'}))

router.use(products);
router.use(shopping_cart);
router.use(customers);
router.use(orders);
router.use(stripe)



module.exports = router;