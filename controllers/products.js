const db = require('../models/index');

class Product {

    /**
     * @description - gets all products routes
     * 
     * @param req - request
     * @param res - response
     * @param next - 
     */
    static async getAllProducts(req, res, next)  {
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
    }

    /**
     * @description - gets products by product_id
     * 
     * @param req - request
     * @param res - response
     * @param next - 
     */
    static async getProduct (req, res, next) {
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
    }

    /**
     * @description - search products routes
     *  * @param req - request
     * @param res - response
     * @param next - 
     */
    static async searchProduct (req, res, next) {
        try{
            //queries params
            const page = req.query.page;
            const limit = req.query.limit;
            const query_string = req.query.query_string;
            let result = await db.search_product_by_name_desc(query_string, page, limit);
            res.status(200).json({
                count: result.length,
                result
            })
        }
        catch(exception){
            res.status(400).json({
                code: "PRD_02",
                status: 400,
                message: "",
              })
        }
    }

    /**
     * @description - get products by department routes
     *  * @param req - request
     * @param res - response
     * @param next - 
     */
    static async getProductByDepartmentId (req, res, next) {
        try{
            //queries params
            const page = req.query.page;
            const limit = req.query.limit;
            const department_id = req.params.department_id;
            let result = await db.product_department_id(department_id, page, limit);
            res.status(200).json({
                count: result.length,
                result
            })
        }
        catch(exception){
            res.status(400).json({
                code: "PRD_04",
                status: 400,
                message: "Error occurred in product search by department",
              })
        }
    }

    /**
     * @description - gets products by category route
     * @param req - request
     * @param res - response
     * @param next - 
     */
    static async getProductByCategoryID (req, res, next) {
        try{
            //queries params
            const page = req.query.page;
            const limit = req.query.limit;
            const category_id = req.params.category_id;
            let result = await db.product_category_id(category_id, page, limit);
            res.status(200).json({
                count: result.length,
                result
            })
        }
        catch(exception){
            res.status(400).json({
                code: "PRD_03",
                status: 400,
                message: "Error in product search by category",
              })
        }
    }
}

module.exports = Product;