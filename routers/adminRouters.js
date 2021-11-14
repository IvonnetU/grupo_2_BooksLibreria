const express = require('express');
const router = express.Router();

const mainController = require('../controllers/adminController.js');

router.get('/', mainController.index);

router.get('/agregar', mainController.add);

router.get('/editar', mainController.edit);

router.get('/eliminar', mainController.delete);

module.exports = router;