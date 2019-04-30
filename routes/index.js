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
        
        let result = await db.all(page,limit);
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


module.exports = router;