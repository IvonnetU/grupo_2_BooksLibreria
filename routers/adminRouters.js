const express = require('express');
const router = express.Router();

const mainController = require('../controllers/adminController.js');

router.get('/', mainController.index);

router.get('/add', mainController.add);

module.exports = router;