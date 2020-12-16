const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Quiz extends Model {}

Quiz.init({
    // Definition des attributs de mon model
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
  }, {
    // Configuration du model 
    sequelize, // Passation de l'instance de la connexion en BDD
    tableName: 'quiz' // Nom de la table
  });

module.exports = Quiz;