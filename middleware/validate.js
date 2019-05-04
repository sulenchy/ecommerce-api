const validate = require('validate.js');

const { check } = require('express-validator/check')

const validate_cust_basic_info = [
    check('email', 'email field does not exist').exists(),
    check('email', 'Email is invalid').isEmail(),
    check('name', 'name field does not exist').exists(),
    check('name', 'name should be alphabet').isAlpha(),
    check('eve_phone', 'eve_phone does not exist').exists(),
    check('eve_phone', 'eve_phone should be numbers').isNumeric(),
    check('mob_phone', 'mob_phone does not exist').exists(),
    check('mob_phone', 'eve_phone should be numbers').isNumeric(),
    check('day_phone', 'day_phone does not exist').exists(),
    check('day_phone', 'eve_phone should be numbers').isNumeric(),
];

const validate_customer_login = [
    check('email', 'email field does not exist').exists(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'password field does not exist').exists(),
    check('password', 'Must be atleast 5 character').isLength(5),
];

const validate_customer_register = [
    check('email', 'email field doesnot exist').exists(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'password field does not exist').exists(),
    check('password', 'Must be atleast 5 character').isLength(5),
    check('name', 'name field does not exist').exists(),
    check('name', 'name should be alphabet').isAlpha(),
]

const validate_cust_address_info = [
    check('address1', 'address1 field does not exist').exists(),
    check('address2', 'address2 field does not exist').exists(),
    check('city', 'city field does not exist').exists(),
    check('region', 'region field does not exist').exists(),
    check('postal_code', 'postal_code does not exist').exists()
];

const validate_cust_credit_card = [
    check('credit_card', 'credit_card fields does not exist').exists()
];
const validate_orders = [
    check('total_amount', 'total_amount field does not exist').exists(),
    check('tax_id', 'tax_id field does not exist').exists(),
    check('shipping_id', 'shipping_id field does not exist').exists()
];

const validate_new_shopping_cart = [
    check('cart_id', 'card_id does not exist').exists(),
    check('cart_id', 'card_id should be integer').isInt(),
    check('product_id', 'product_id does not exist').exists(),
    check('attributes', 'attributes does not exist').exists(),
    check('quantity', 'quantity does not exist').exists(),
    check('buy_now', 'buy_now does not exist').exists()
];




module.exports = { 
    validate_cust_basic_info,
    validate_cust_address_info,
    validate_cust_credit_card,
    validate_customer_login,
    validate_customer_register,
    validate_orders,
    validate_new_shopping_cart
};
