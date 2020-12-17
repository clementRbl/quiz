const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const express = require('express');

const app = express();

// on rajoute les gestion des POST body
app.use(express.urlencoded({extended: true}));

// reglage views
app.set('views', 'app/views');
app.set('view engine', 'ejs');

// Statiques
app.use(express.static('public'));

// Routage
const router = require('./app/router');
app.use(router);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});