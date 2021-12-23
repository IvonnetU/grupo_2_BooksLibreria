// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const mainController = require('../controllers/mainController.js');


router.get('/', mainController.index);

module.exports = router;