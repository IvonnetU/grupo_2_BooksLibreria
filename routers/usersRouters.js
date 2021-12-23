// ************ Require's ************
const express = require('express');
const router = express.Router();
const { body } = require("express-validator");

// ************ Controller Require ************
const usersController = require('../controllers/usersController.js');


/************** Validación del formulario ****************/
const validateFormRegister = [
  body('name').notEmpty().withMessage('Debes completar el campo de nombre'),
  body('lastname').notEmpty().withMessage('Debes completar el campo de apellido'),
  body('email').notEmpty().withMessage('Debes completar el campo de email').isEmail().withMessage('Debes ingresar un email valido'),
  body('phone').isMobilePhone().withMessage('Debes ingresar un número valido'),
  body('pass').notEmpty().withMessage('Debes completar el campo de contraseña'),
  body('confirmpass').notEmpty().withMessage('Debes completar el campo de confirmación de contraseña')
];

/*** Formulario de registro ***/
router.get('/register', usersController.register);
router.post('/register',validateFormRegister, usersController.create);

/*** Formulario de ingreso ***/
router.get('/login', usersController.login);

module.exports = router;