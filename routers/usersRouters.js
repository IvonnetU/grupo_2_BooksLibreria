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

/************** Validación del formulario ****************/
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

/*** Registro ***/
router.get('/register',guestMiddleware, usersController.register);
router.post('/register',validateFormRegister, usersController.create);

/*** Login ***/
router.get('/login',guestMiddleware, usersController.login);
router.post('/login', usersController.loginProcess);

/*** Profile***/
router.get('/profile',authMiddleware, usersController.profile);

/*** Log out***/
router.get('/logout', usersController.logout);

module.exports = router;