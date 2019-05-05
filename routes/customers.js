const express = require('express');
const Customer = require('../controllers/customers');
const validate = require('../middleware/validate');
const checkToken = require('../middleware/checkToken');

const router = express.Router();

router.post('/customers', validate.validate_customer_register, Customer.register_customer);
router.post('/customers/login', validate.validate_customer_login, Customer.login_customer);
router.put('/customer', validate.validate_cust_basic_info ,checkToken.checkToken, Customer.update_customer_phone_info);
router.put('/customers/address', validate.validate_cust_address_info, checkToken.checkToken, Customer.update_customer_address_info);
router.put('/customers/creditCard',validate.validate_cust_credit_card, checkToken.checkToken, Customer.update_customer_credit_card_info);


module.exports = router;