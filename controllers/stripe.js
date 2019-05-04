const db = require('../models/index');
const stripe = require("stripe")("sk_test_lomdOfxbm7QDgZWvR82UhV6D");

class Stripe {

    /**
 * @description - checkout route
 *  * @param req - request
 * @param res - response
 * @param next - 
 */
    static async stripe_charge (req, res, next) {
        const chargeAmount = req.body.chargeAmount;
        const token = req.body.stripeToken;
        const order_id = req.body.order_id;
        const description = req.body.description;
        try{
            stripe.charges.create({
                amount: chargeAmount,
                currency: 'usd',
                metadata: {order_id},
                description: description,
                source: token
            }, (err, charge) => {
                if(err){
                    return res.status(422).json({
                        status: 422,
                        code: 'STP_01',
                        message: "Error in the data submitted"
                    })
                }
                return res.status(201).json(
                        charge
                    )
            })
            
        }
        catch(exception){
            res.status(400).json({
                code: "STP_02",
                status: 400,
                message: exception
              })
        }
    }
}


module.exports = Stripe;