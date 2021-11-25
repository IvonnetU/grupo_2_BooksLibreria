// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controlador del require ************
const productsController = require('../controllers/productController.js');

/*** Listar todos los libros ***/
router.get('/', productsController.list);

/*** Crear un libro ***/
router.get('/create', productsController.create); 
router.post('/create', productsController.store); 

/*** Consultar un libro***/ 
router.get('/:id', productsController.detail); 

/*** Editar un libro ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', productsController.update); 


/*** Eliminar libro***/ 
router.delete('/:id', productsController.destroy); 


/*** Ruta carrito***/ 
router.get('/carrito', productsController.car);



module.exports = router;