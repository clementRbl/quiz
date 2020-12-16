const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Level extends Model {}

Level.init({
    // Definition des attributs de mon model
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Configuration du model 
    sequelize, // Passation de l'instance de la connexion en BDD
    tableName: 'level' // Nom de la table
  });

module.exports = Level;