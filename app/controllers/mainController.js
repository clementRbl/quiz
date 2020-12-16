const {Quiz} = require('../models');

module.exports = {
  homePage: (req, res) => {
    Quiz.findAll({
      include: [{association: 'author'}]
    }).then((quizzes) => {
      res.render('index', {quizzes});
    })
    
  }
}