// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controlador del require ************
const productsController = require('../../controllers/api/productsController');

/*** Listar todos los libros ***/
router.get('/', productsController.list);


/*** Consultar un libro***/ 
router.get('/:id', productsController.detail); 



module.exports = router;