const dotenv = require("dotenv");
dotenv.config();

// const User = require("./app/models/User");
const Quiz = require("./app/models/Quiz");
const Tag = require("./app/models/Tag");
const Question = require("./app/models/Question");
/*
const Level = require("./app/models/Level");

Level.findAll((error, levels) => {
  console.log("FindAll Error", error);
  console.log("Tableau de levels", levels);
});

// On cherche le level pour id 1
Level.findById(1, (error, level) => {
  console.log("findById Error", error);
  console.log(level);

  level.name = "Débutant";
  // On met à jour en BDD l'instance du level récupéré
  level.update((error, updatedLevel) => {
    console.log("Update Error", error);
    // console.log("Comparaison", level === updatedLevel) --> true
    console.log("updatedLevel", updatedLevel);
  });
});

// On insert en BDD une nouvelle instance
const newLevel = new Level({
  name: "Ultra dur",
});
console.log(newLevel);
newLevel.insert((err, level) => {
  console.log("Insert Error", err);
  console.log("Inserted Level", level);
  
  
  // On supprime en BDD l'instance qu'on vient de créer
  console.log(newLevel);
  level.delete((err, deleted) => {
    console.log("Insert Error", err);
    console.log("Est-elle vraiment supprimé", deleted === true);
    console.log("Delete Level", level);
  });
});

*/

// Récupération d'une liste de tous les utilisateurs
// User.findAll((error, users) => {
//   console.log("findAll error", error);
//   console.log("users", users);

//   console.log("\r\n--------------------------------------\r\n");

//   // Récupération d'un utilisateur
//   User.findById(6, (error, user) => {
//     console.log("findById error", error);
//     console.log("user", user);

//     console.log("\r\n--------------------------------------\r\n");
//     // Mise à jour de l'utilisateur 6

//     user.firstname = "Lois";
//     user.email = "lois@hero.com";
//     user.update((error) => {
//       console.log("update error", error);

//       console.log("\r\n--------------------------------------\r\n");
//       // Première facon de créer une nouvelle instance d'un utilisateur
//       /*const userToAdd  = new User({
//         email: 'superman@superhero.com',
//         firstname: 'Clark',
//         lastname: 'Kent',
//         password: '$2b$10$7vwYGrz2TGeyG4X8YnD9BOag9I.YKGUTJELs64qGmcK/syHu2BzTG'
//       });*/

//       const userToAdd  = new User();
//       userToAdd.email = 'superman@superhero.com';
//       userToAdd.firstname = 'Clark';
//       userToAdd.lastname = 'Kent';
//       userToAdd.password = '$2b$10$7vwYGrz2TGeyG4X8YnD9BOag9I.YKGUTJELs64qGmcK/syHu2BzTG';

//       userToAdd.insert((error, userAdded) => {
//         console.log("insert error", error);
//         console.log("userAdded", userAdded);

//         console.log("\r\n--------------------------------------\r\n");

//         userAdded.delete((error, isDelete) => {
//           console.log("delete error", error);
//           console.assert(isDelete, "L'utilisateur n'a pas été supprimé")
//         });
//       });
//     });
//   });
// });

// Tag.findById(9, (error, tag) => {
//   console.log(tag);
//   tag.delete((error, isDelete) => {
//     console.log("delete error", error);
//     console.assert(isDelete, "Le tag n'a pas été supprimé");
//   });
// });
const tag = new Tag({
  name: "Nouveau tag",
});
const question = new Question({
  question: `Ceci est ma question`,
  anecdote: `Ceci est mon anecdote`,
  wiki: 'http://wikipedia.fr',
  level_id: 1,
  answer_id: 2,
  quiz_id: 3,
});


// tag.insert((error, userAdded) => {
//   console.log("insert error", error);
//   console.log("tagAdded", userAdded);
// });

// Si id on update si pas id on insert
question.save((error, questionSaved) => {
  console.log("insert error", error);
  console.log("questionSaved", questionSaved);

  console.log('-------------------------------------- \n\r');

  questionSaved.save((error, questionSaved) => {
    console.log("update error", error);
    console.log("questionSaved", questionSaved);
  });
});


// Exemple de findBy
// Question.findBy({id: 3, answer_id: 10 }, callback) 


