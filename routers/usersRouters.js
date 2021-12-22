const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController.js');

/*** Formulario de registro ***/
router.get('/register', usersController.register);
// router.post('/register', usersController.create);

/*** Formulario de ingreso ***/
router.get('/login', usersController.login);

module.exports = router;