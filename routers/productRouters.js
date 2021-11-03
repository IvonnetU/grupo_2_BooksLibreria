const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productController.js');


router.get('/detalle-producto/:idProducto?', productsController.detail);
router.get('/carrito', productsController.car);


module.exports = router;