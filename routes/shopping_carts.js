const express = require('express');
const Shopping_Cart = require('../controllers/shopping_carts');
const validate = require('../middleware/validate');

const router = express.Router();


router.post('/shoppingcart/add', validate.validate_new_shopping_cart, Shopping_Cart.add_item_to_cart)

module.exports = router;