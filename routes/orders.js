const express = require('express');
const Orders = require('../controllers/orders');
const validate = require('../middleware/validate');
const checkToken = require('../middleware/checkToken');

const router = express.Router();

router.post('/orders',validate.validate_orders, checkToken.checkToken, Orders.create_order);


module.exports = router;