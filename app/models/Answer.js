const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Answer extends Model {}

Answer.init({
    // Definition des attributs de mon model
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Configuration du model 
    sequelize, // Passation de l'instance de la connexion en BDD
    tableName: 'answer' // Nom de la table
  });

module.exports = Answer;