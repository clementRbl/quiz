const Answer = require('./Answer');
const Level = require('./Level');
const Question = require('./Question');
const Quiz = require('./Quiz');
const Tag = require('./Tag');
const User = require('./User');

/**
 * Question
 */

// Une question a plusieurs answers
Question.hasMany(Answer, {
    foreignKey: 'question_id',
    as: 'answers'
});

// Une question est validée par une réponse
Question.belongsTo(Answer, {
    foreignKey: 'answer_id',
    as: 'good_answer'
});

// Une question dépends d'un level
Question.belongsTo(Level, {
    foreignKey: 'level_id',
    as: 'level'
});

// Une question dépends/appartient à un quiz
Question.belongsTo(Quiz, {
    foreignKey: 'quiz_id',
    as: 'quiz'
})

// On exporte question
module.exports.Question = Question;

/**
 * Answer
 */

// Une réponse dépends d'une question
Answer.belongsTo(Question, {
    foreignKey: 'question_id',
    as: 'question'
})

// Une réponse peut valider une question
Answer.hasOne(Question, {
    foreignKey: 'answer_id',
    as: 'validated_question'
});

// On exporte answer
module.exports.Answer = Answer;


/**
 * Level
 */

 Level.hasMany(Question, {
     foreignKey: 'level_id', 
     as: 'questions'
 })

// On exporte level
module.exports.Level = Level;

 /**
  * Tag ( Themes )
  */

  // Un tag dépends de plusieurs quizzes
 Tag.belongsToMany(Quiz, {
    through: 'quiz_has_tag',
    foreignKey: 'tag_id', // Le nom de la clef de tag dans la table de liaison
    otherKey: 'quiz_id', // L'autre clef
    as: "quizzes"
});


// On exporte Tag
module.exports.Tag = Tag;
/**
 * Quiz
 */

 // Un quiz dépends de plusieurs tags
 Quiz.belongsToMany(Tag, {
     through: 'quiz_has_tag', // Cette liaison pourra être faites à travers la table ...quiz_has_tag
     foreignKey: 'quiz_id', // Le nom de la clef de quiz dans la table de liaison
     otherKey: 'tag_id', //Le nom de la clef de l'autre ( l'autre clef en fait )
     as: 'tags'
 });

 // Un quiz est composé de plusieurs questions
 Quiz.hasMany(Question, {
     foreignKey: 'quiz_id',
     as: 'questions'
 });

 // Le quiz dépends d'un auteur
 Quiz.belongsTo(User, {
     foreignKey: 'user_id',
     as: "author"
 });

 module.exports.Quiz = Quiz;

 /**
  * User
  */

  // Un utilisateur possède plusieurs quizzes
 User.hasMany(Quiz, {
     foreignKey: 'user_id',
     as: 'quizzes'
 })

 // On exporte le User
 module.exports.User = User;