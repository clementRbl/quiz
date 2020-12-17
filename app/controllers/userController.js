const {User} = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
  showLogin: (req, res) => {
    res.render('login')
  },
  showSignup: (req, res) => {
    res.render('signup')
  },
  loginAction : (req, res) => {
    // On recupere les parametres envoyes depuis la page de login
    const { email, password } = req.body;

    // On cherche l'utilisateur en fonction de son email
    User.findOne({
      where: {
        email
      }
    }).then((user) => {
      // Si le user n'existe pas, on rends la page login avec une erreur
      if (!user) {
        return res.render('login', {
          error: `L'email est incorrect`,
          email 
        })
      }
      // Si l'adresse email de l'utilisateur existe, on test si le mdp est valide
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      // Si le mot de passe n'est pas valide
      if (!isPasswordValid) {
        return res.render('login', {
          error: `Le mot de passe est incorrect`,
          email
        });
      }
      // Si tout vas bien, on le stock en session
      req.session.user = user;

      // On supprime le mot de passe de la session
      delete req.session.user.password;
      // Puis on le redirigera vers la page d'accueil
      res.redirect('/')
    })
  }

};