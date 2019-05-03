const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config()


const sendMail = (receiver_email, order_id) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: receiver_email,
        subject: 'Order Confirmation Email from e-commerce',
        text: `
        Hi Customer,
        
        We are reaching out concerning the order you placed with an ID ${order_id}
        
        Thank you.`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          throw new Error(error)
        } else {
          return info.response
        }
      });
}

module.exports = sendMail;