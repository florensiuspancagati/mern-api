const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

// create -> post
router.post('/product', productsController.createProduct);

// read -> get
router.get('/products', productsController.getAllProducts);


module.exports = router;