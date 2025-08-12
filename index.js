const express = require('express');

const app = express();
const productsRoutes = require('./src/routes/products');

app.use('/', productsRoutes);
app.listen(3000);
