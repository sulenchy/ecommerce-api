const express = require('express');
const dotenv = require('dotenv');
const routers = require('./routes/index');
const bodyParser = require('body-parser')

dotenv.config();
port = process.env.PORT || 3000;

app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(routers);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))