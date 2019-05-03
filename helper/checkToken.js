
let jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


const  expiresIn  =  24  *  60  *  60;
const secret = process.env.SECRET;

/**
 * @description - checks token sent for authentication
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          status: 401,
          code: "AUT02",
          message: "The apikey is invalid.",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      status: 401,
      code: "AUT02",
      message: 'Auth token is not supplied'
    });
  }
};

/**
 * @description - signs the token sent
 * @param {*} customerId 
 */
const  accessToken = (customerId) =>{
    return jwt.sign({ id: customerId }, secret, {
        expiresIn:  expiresIn
    });
}  

module.exports = {
  checkToken: checkToken,
  accessToken: accessToken
}