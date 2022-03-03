// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controlador del require ************
const usersController = require('../../controllers/api/usersController');

/*** Listar todos los libros ***/
router.get('/', usersController.list);


/*** Consultar un libro***/ 
router.get('/:id', usersController.detail); 



module.exports = router;