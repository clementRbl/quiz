const dotenv = require("dotenv");
dotenv.config();

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

