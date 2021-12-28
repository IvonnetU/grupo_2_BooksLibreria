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
  body('city').notEmpty().withMessage('Debes completar la ciudad'),
  body('phone').isMobilePhone().withMessage('Debes ingresar un número valido'),
  body('pass').notEmpty().withMessage('Debes completar el campo de contraseña').isLength({ min: 6 }).withMessage('Debes generar una contraseña de al menos 6 caracteres'),
  body('confirmpass').notEmpty().withMessage('Debes completar el campo de confirmación de contraseña').isLength({ min: 6 }).withMessage('Debes generar una contraseña de al menos 6 caracteres').custom((value, {req}) => (value === req.body.pass)).withMessage('las contraseñas no coinciden'),
  body('condictions').exists().withMessage('Debes aceptar la politica de tratamiento de datos')
];

/*** Formulario de registro ***/
router.get('/register', usersController.register);
router.post('/register',validateFormRegister, usersController.create);

/*** Formulario de ingreso ***/
router.get('/login', usersController.login);

module.exports = router;