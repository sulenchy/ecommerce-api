const express = require('express');
const router = express.Router()
const db = require('../database/config');

// gets all products
router.get('/products', async(req, res, next) => {
    try{
        let result = await db.all();
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