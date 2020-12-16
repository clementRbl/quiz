const express = require('express');
const { homePage } = require('./controllers/mainController');
const mainController = require('./controllers/mainController');
const router = express.Router();

router.get('/', mainController.homePage);



module.exports = router;