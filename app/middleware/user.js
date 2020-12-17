// Un petit middleware pour tester si un utilisateur est connecté
// Si c'est le cas, on le rajoute dans les res.locals
// ainsi, on pourra utiliser la variable "user", dans toutes les views sans se poser de question

module.exports = (req, res, next) => {
  if (req.session.user){
      res.locals.connected_user = req.session.user;
  }
  else {
      res.locals.connected_user = false;
  }
  next();
}