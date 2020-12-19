// Un petit middleware pour tester si un utilisateur est admin ou pas
// Si c'est le cas, on next
// Sinon on le redirige vers une page 403 Unauthorized
module.exports = (req, res, next) => {
  // s'il n'est pas connecte
  if (!req.session.user){
    // on le renvoi sur la page de login
      return res.redirect('/login')
  }
  console.log("req,session.user.role", req.session.user.role);

  // Si il est connecte et que c'est un admin
  if (req.session.user.role === "admin") {
    return next();
  }
  // Sinon on le renvoi sur la page 403
  else {
    return res.status(403).render('403')
  }

}