const stripe = require("stripe")("sk_test_lomdOfxbm7QDgZWvR82UhV6D");



// This intend to create the token for the user dynamically
const createStripeToken = () => {
    stripe.tokens.create({
            card: {
              number: '4242424242424242',
              exp_month: 12,
              exp_year: 2020,
              cvc: '123'
            }
          }, function(err, token) {
        try{
            if(err){
                return new Error({
                    status: 400,
                    code: 'STP_03',
                    message: 'Token failed to be created'
                })
            }

            return token
        }
        catch(exception){
            throw new Error({
                status: 401,
                code: 'STP_02',
                message: 'Invalid card found'
            })
        }
      });
}

module.exports = createStripeToken;

