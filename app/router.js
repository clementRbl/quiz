const express = require('express');
const quizController = require('./controllers/quizController');
const mainController = require('./controllers/mainController');
const userController = require('./controllers/userController');
const tagController = require('./controllers/tagController');
const adminController = require('./controllers/adminController');
const adminMiddleware = require('./middleware/admin');

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
router.post('/signup', userController.signUpAction);

// Route concernant l'administration du site
router.get('/admin', adminMiddleware, adminController.adminPage);

//Route pour la deconnexion de l'utilisateur
router.get('/disconnect', userController.disconnectAction);

// Route de page de profil d'un utilisateur
router.get('/profile', userController.profilePage);


module.exports = router;