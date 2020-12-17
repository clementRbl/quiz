const express = require('express');
const quizController = require('./controllers/quizController');
const mainController = require('./controllers/mainController');
const userController = require('./controllers/userController');
const tagController = require('./controllers/tagController');


const router = express.Router();

// Page d'accueil
router.get('/', mainController.homePage);
// Page de detail d'un Quiz
router.get('/quiz/:id', quizController.showDetail);

//Formulaire de listing des tags
router.get('/tags', tagController.showList);
// Page de détail d'un tag
router.get('/tag/:id', tagController.showDetail);

//Formulaire de connexion
router.get('/login', userController.showLogin);
//Formulaire d'inscription
router.get('/signup', userController.showSignup);

router.post('/login', userController.loginAction);
router.post('/signup', userController.showSignup);
module.exports = router;