var express = require('express');
var dotenv = require('dotenv');

dotenv.config();

app = express(),
port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))