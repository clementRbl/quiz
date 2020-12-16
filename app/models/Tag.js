const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Tag extends Model {}

Tag.init({
  // On défini les attributs de notre modèle
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // On paramètre le model
  sequelize, // On a besoin de passer l'instance de la connexion en BDD
  tableName: 'tag'
});


module.exports = Tag;