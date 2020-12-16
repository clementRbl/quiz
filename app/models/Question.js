const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Question extends Model {}

Question.init({
    
    question: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    anecdote: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    wiki: {
        type: DataTypes.TEXT,
        allowNull: false
    }
  }, {
    sequelize, 
    tableName: 'question' 
  });

module.exports = Question;