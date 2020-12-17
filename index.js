const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const session = require('express-session');
const app = express();
const userMiddleware = require('./app/middleware/user');
// on rajoute les gestion des POST body
app.use(express.urlencoded({extended: true}));

// reglage views
app.set('views', 'app/views');
app.set('view engine', 'ejs');

// Statiques
app.use(express.static('public'));

// Configuration de la session
app.use(session({
  secret: 'Super secrer mon coupain !', // secret key
  resave: false, 
  saveUninitialized: true,
  cookie: {
    secure: false, // pour https
    maxAge: (1000*60*60) // 1 heure
  }
}));

app.use(userMiddleware)


// Routage
const router = require('./app/router');
app.use(router);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});