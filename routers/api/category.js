// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controlador del require ************
const productsController = require('../../controllers/api/categoryController');

/*** Listar todos los libros ***/
router.get('/', productsController.list);



module.exports = router;