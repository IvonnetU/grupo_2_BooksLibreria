// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controlador del require ************
const productsController = require('../controllers/productController.js');

/*** Listar todos los libros ***/
router.get('/', productsController.list);

/*** Ruta carrito***/ 
router.get('/car', productsController.car);

/*** Consultar un libro***/ 
router.get('/:id', productsController.detail); 


module.exports = router;