const {User} = require('../models');

module.exports = {
  showLogin: (req, res) => {
    res.render('login')
  },
  showSignup: (req, res) => {
    res.render('signup')

  }

};