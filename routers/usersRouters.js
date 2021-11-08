const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController.js');

router.get('/register', usersController.regis);
router.get('/login', usersController.log);

module.exports = router;