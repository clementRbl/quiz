const express = require('express');
const quizController = require('./controllers/quizController');
const mainController = require('./controllers/mainController');

const router = express.Router();

// Page d'accueil
router.get('/', mainController.homePage);

// Page de detail d'un Quiz
router.get('/quiz/:id', quizController.showDetail);


module.exports = router;