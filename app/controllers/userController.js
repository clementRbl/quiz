const {User} = require('../models');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');

module.exports = {
  showLogin: (req, res) => {
    res.render('login')
  },
  showSignup: (req, res) => {
    res.render('signup')
  },

  signUpAction: (req, res) => {
    const {lastname, firstname, email, password, passwordConfirm} = req.body;
    // les vérifs à faire : 
    // - 1: format d'email valide
    const isEmailValid = emailValidator.validate(email); // true
    if (!isEmailValid){
        return res.render('signup', {
            error: `Cette adresse email n'est pas valide`,
            firstname,
            lastname,
            email
        })
    }
    // - 2: l'utilisateur existe déjà

    User.findOne({
        where: {
            email
        }
    }).then((user) => {
        if (user){
            return res.render('signup', {
                error: `Cet utilisateur existe déjà`,
                firstname,
                lastname,
                email
            })
        }

        // - 3: le mdp n'est pas vide
        if (!password.trim()){
            return res.render('signup', {
                error: `Aucun mot de passe saisi`,
                firstname,
                lastname,
                email
            });
        }

        // - 4: le mdp et la confirmation ne correspondent pas
        if (password !== passwordConfirm){
            return res.render('signup', {
                error: `La confirmation du mot de passe ne correspond pas`,
                firstname,
                lastname,
                email
            });
        }

        // - 5: Si on avait le courage, vérifier que le mdp répond aux recommendations CNIL...

        // Si on est tout bon, on crée le User !
        const encryptedPassword = bcrypt.hashSync(password, 10);

        // Première facon de faire

        // const newUser = new User({
        //     firstname,
        //     lastname,
        //     email,
        //     password: encryptedPassword
        // });

        // newUser.save().then(() => {
        //     return res.redirect('/login')
        // })            

        // Deuxième facon de faire

        const newUser = User.create({
            firstname,
            lastname,
            email,
            password: encryptedPassword
        }).then(() => {
            return res.redirect('/login')
        });
    })

},


  loginAction: (req, res) => {
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
  },

  disconnectAction: (req, res) => {
    delete req.session.user;
    return res.redirect('/');
  },

  profilePage: (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    res.render('profile', {
      user: req.session.user
    });
  }

};