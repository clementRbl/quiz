const { Sequelize } = require('sequelize');

// Configuration de la connexion a ma BDD
const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    timestamps: false
  }
});

// j'exporte le client 
module.exports = sequelize;
