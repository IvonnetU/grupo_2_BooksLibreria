// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controlador del require ************
const productsController = require('../controllers/productController.js');

/*** Listar todos los libros ***/
router.get('/', productsController.list);


/*** Consultar un libro***/ 
router.get('/:id', productsController.detail); 


/*** Ruta carrito***/ 
router.get('/carrito', productsController.car);



module.exports = router;