const {Quiz} = require('../models');

module.exports = {
  showDetail: (req, res) => {
    const id = req.params.id;

     Quiz.findByPk(id,{
       include: [
         'author',
         'tags',
         {
           association: 'questions',
           include: ['level', 'answers']
         }
         
        ]
     }).then((quiz) => {
       res.render('quizz', {quiz});
     })
    
  }
}