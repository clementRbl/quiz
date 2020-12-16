const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class User extends Model {}

User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
    
  }, {
    sequelize, 
    tableName: 'user' 
  });

module.exports = User;