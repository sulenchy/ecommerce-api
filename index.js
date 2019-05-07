const express = require('express');
const dotenv = require('dotenv');
const routers = require('./routes/index');
const bodyParser = require('body-parser')

const delete_shopping_cart = require('./helper/delete_shopping_cart');

dotenv.config();
port = process.env.PORT || 3000;

app = express();

const delete_me = delete_shopping_cart();

// deleting the unused shopping cart on a daily basis
setInterval(() => delete_me, 86400000);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(routers);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))