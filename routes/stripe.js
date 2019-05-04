const express = require('express');
const Stripe = require('../controllers/stripe')
const router = express.Router();



router.post('/stripe/charge', Stripe.stripe_charge)


module.exports = router;