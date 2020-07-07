# Le projet

Besoin de créer une application web qui est une plateforme de quizz pour une école.

Les quizz devront avoir:
- des thématiques
- des sujets
- des difficultés
- un auteur
- des questions
- des réponses
- un contexte
- un récap des réponses aprés voir répondu, mais non sauvegardés en BDD

Il faudra pouvoir se logger et donc s'inscrire

Chaque quizz devra être référencé par auteur.

La gestion se fera directement par BDD, que le client gérera tout seul, donc pas d'interface backoffice

# Uses Cases

## En tant que visiteur je veux : 

 - Acceder à un formulaire de connexion *afin de* pouvoir me connecter
 - Acceder à un formulaire d'inscription *afin de* pouvoir créer mon compte
 - Acceder à une liste de projet *afin de* pouvoir choisir un projet
 - Acceder à une liste de projet par difficulté *afin de* pouvoir choisir un projet suivant sa difficulté
 - Acceder à une liste de projet par thème *afin de* pouvoir choisir un projet suivant son thème

## En tant que membre je veux :
 - Accéder à un bouton de déconnexion *afin de* pouvoir me déconnecter
 - Accéder au détail d'un quizz *afin de* pouvoir y répondre
 - Acceder à une page de correction du quizz *afin de* visualiser mon score ainsi que la réponses au quizz
 - Acceder à ma page de profil *afin de* visualiser les données de mon compte
 - Avoir accès à un bouton supprimer mon compte *afin de* supprimer mon compte
 - Avoir accès à un bouton modifier mon mot de passe *afin de* modifier mon mot de passe

## En tant que redactor je veux :
 - Accéder à mon espace d'administration
 - Pouvoir faire un CRUD sur mes quizz
 - Pouvoir faire un CRUD sur des réponses
 - Pouvoir faire un CRUD sur les thèmes
 - Pouvoir faire un CRUD sur les sujets
 - Pouvoir faire un CRUD sur les questions
