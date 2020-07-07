# Liste des entités : 

- utilisateur
  - prénom 
  - nom
  - email
  - mot de passe
  - role (member, redactor)

- quizz
  - titre
  - theme
  - auteur ( utilisateur )
  - questions
  - sujet

- question
  - description
  - propositions
  - réponse   
  - niveau
  - contexte
  - wiki

- proposition ( réponse )
  - description

- niveau
  - nom
  - couleur

- theme
  - nom

# MCD

 ```mcd
appartient, 0N theme, 0N quizz
theme: _nom
défini, 0N niveau, 11 question
niveau: _nom

quizz: _titre, description
compose, 11 question, 0N quizz
question: _description, contexte, wiki
possède, 0N question, 11 proposition

créé, 0N utilisateur, 11 quizz
utilisateur: _prénom, nom, email, mot de passe
valide, 11 question, 01 proposition
proposition: _description
 ```