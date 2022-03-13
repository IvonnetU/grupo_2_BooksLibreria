// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controlador del require ************
const usersController = require('../../controllers/api/usersController');

/*** Listar todos los usuarios ***/
router.get('/', usersController.list);


/*** Consultar un usuario***/ 
router.get('/:id', usersController.detail); 



module.exports = router;