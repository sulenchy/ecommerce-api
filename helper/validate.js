const validate = require('validate.js');

const { check } = require('express-validator/check')

const validate_cust_basic_info = [
    check('email').exists().isEmail(),
    check('name').exists().isAlpha(),
    check('eve_phone').exists().isNumeric(),
    check('mob_phone').exists().isNumeric(),
    check('day_phone').exists().isNumeric(),
];

const validate_customer_login = [
    check('email').exists().isEmail(),
    check('password').exists().isLength(5),
];

const validate_customer_register = [
    check('email').exists().isEmail(),
    check('password').exists().isLength(5),
    check('name').exists(),
]

const validate_cust_address_info = [
    check('address1').exists(),
    check('address2').exists(),
    check('city').exists(),
    check('region').exists(),
    check('postal_code').exists()
];

const validate_cust_credit_card = [
    check('credit_card').exists()
];
const validate_orders = [
    check('total_amount').exists(),
    check('tax_id').exists()
];

const validate_new_shopping_cart = [
    check('cart_id').exists().isInt(),
    check('product_id').exists(),
    check('attributes').exists(),
    check('quantity').exists(),
    check('buy_now').exists()
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
