const express = require('express');
const db = require('../models/index');
const Product = require('../controllers/products');

const router = express.Router();


router.get('/products', Product.getAllProducts)
router.get('/products/inCategory/:category_id', Product.getProductByCategoryID)
router.get('/products/inDepartment/:department_id', Product.getProductByDepartmentId)
router.get('/products/search', Product.searchProduct)
router.get('/products/:product_id',Product.getProduct)

module.exports = router;
