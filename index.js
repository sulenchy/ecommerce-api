const express = require('express');
const dotenv = require('dotenv');
const routers = require('./routes/index');

dotenv.config();
port = process.env.PORT || 3000;

app = express();
app.use(routers);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))