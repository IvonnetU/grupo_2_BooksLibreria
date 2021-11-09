const express = require('express');
const router = express.Router();

const mainController = require('../controllers/adminController.js');

router.get('/', mainController.index);

module.exports = router;