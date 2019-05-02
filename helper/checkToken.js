
let jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


const  expiresIn  =  24  *  60  *  60;
const secret = process.env.secret;

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, 'hgjhn', (err, decoded) => {
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

const  accessToken = (customerId) =>{
    return jwt.sign({ id: customerId }, SECRET_KEY, {
        expiresIn:  expiresIn
    });
}  

module.exports = {
  checkToken: checkToken,
  accessToken: accessToken
}