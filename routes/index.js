const express = require('express');
const router = express.Router()
const db = require('../database/config');

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
            code: "PRD_02",
            status: 400,
            message: exception,
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
            code: "PRD_02",
            status: 400,
            message: exception,
          })
    }
})

router.get('/products/search/t', async(req, res, next) => {
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
            message: exception,
          })
    }
})



module.exports = router;