# Projet oQuiz

Un client est venu nous voir pour nous demander de lui créer un site qui fait des quizzes ! Apparemment c'est quelqu'un d'important car il connait Elon Musk, houlala !

Voici ce qu'il nous a demandé :

![DemandesClient1](docs/demandes_client_1.png)

![DemandesClient2](docs/demandes_client2.png)

Nous avons commencé a définir les besoins sous forme de uses cases disponibles [ici](uses_cases.md)

Et on a commencé aussi a créer quelques wireframes : 

 - Page de connexion : https://wireframe.cc/wvwa2y
 - Page d'accueil : https://wireframe.cc/V5m8ot
 - Détail d’un quizz : https://wireframe.cc/hbrvgq
 - Résultat d’un quizz: https://wireframe.cc/r96bdA
 - Liste des sujets : https://wireframe.cc/8nA9pN


# OQuizz

## Jour Zéro : Le début du commencement

Pour commencer, il faut mettre en place la base de données !

Les choses à faire, dans l'ordre :

- Créer un utilisateur PostgreSQL, nommé "oquizz", avec un mot de passe et les droits nécessaires.
- Créer une base de données nommée "oquizz", dont le propriétaire est l'utilisateur "oquizz".
- Créer les tables grâce au fichier "import_tables.sql".
- Importer les données grâce au fichier "import_data.sql".

<details>
<summary>Je me rappelle plus trop des commandes...</summary>

### Créer un utilisateur PostgreSQL, nommé "oquizz", avec un mot de passe et les droits nécessaires

- d'abord se connecter à PostgreSQL en tant que "postgres": `sudo -i -u postgres`, puis `psql`
- puis créer l'utilisateur : `CREATE USER oquiz WITH LOGIN PASSWORD 'oquiz';`

### Créer une base de données nommée "oquizz", dont le propriétaire est l'utilisateur "oquizz"

- d'abord se connecter à PostgreSQL en tant que "postgres" (si c'est pas déjà fait): `sudo -i -u postgres`, puis `psql`
- puis créer l'utilisateur : `CREATE DATABASE oquiz OWNER oquiz;`

### Créer les tables grâce au fichier "import_tables.sql"

- `psql -U oquiz -f data/import_tables.sql`

### Importer les données grâce au fichier "import_data.sql"

- `psql -U oquiz -f data/import_data.sql`

</details>

On pourra ensuite se connecter à la BDD dans le code via l'url : `postgres://oquiz:oquiz@localhost/oquizz`

## Du code classe !

Créer un dossier `app`, puis un sous-dossier `app/models`.

Dans ce dossier, on va coder des classes à partir du MCD du projet :

- une classe par entité: `Answer`, `Level`, `Question`, `Quiz`, `Tag`, et `User`
- une seule classe par fichier ! Le fichier porte le même nom que la classe, en minuscule.

Dans chaque classe :

- déclarer une propriété pour chaque champ de la table correspondante.
- coder un `constructor` qui prend en paramètre un objet. Cet objet contient toutes les valeurs à recopier dans l'instance.
- ne pas oublier d'exporter la classe !

<details>
<summary>Heuuu oui... t'as un exemple ?</summary>

Le but, c'est d'arriver à faire ça :

```JS

const monTag = new Tag({
  name: "un super tag"
});
```

On devrait donc avoir un truc dans ce genre :

```JS
class Tag {
  constructor(obj) {
    this.name = obj.name;
  }
};
```

</details>

## Do not repeat yourself

La propriété `id` est présente dans toutes les classes.

On va donc... les factoriser ! Et pour ce faire, on va utiliser l'héritage !

On va donc coder une class `CoreModel`, dans le même dossier que les autres, et toutes les classes vont _hériter_ de celle-ci :

- Penser à exporter `CoreModel`.
- Penser à require `CoreModel` dans les autres fichiers.
- Penser à appeler le "constructeur parent" dans les constructeur des classes.

## Get/Set

Dans chaque classe, à commencer par `CoreModel`, coder un "getter" et un "setter" par propriété.

<details>
<summary>Un exemple </summary>

```js
class CoreModel {
  id;

  getId() {
    return this.id;
  };

  setId(value) {
    this.id = value;
  };
};
```

</details>

## Bonus : ne pas autoriser de valeurs absurdes

Dans les "setters", rajouter des tests pour vérifier que la donnée passée en argument est au moins du bon type.

<details>
<summary>Un exemple</summary>

```js
class CoreModel {
  id;

  setId(value) {
    if( typeof value !== 'number') {
      throw Error("CoreModel.id must be a number !");
      // on "lève" une erreur => ça arrête tout !
    }
    this.id = value;
  }
};
```

</details>

# Oquiz, challenge jour 1

En utilisant l'analyse préliminaire de la BDD, le MCD, et la [fiche récap MLD](https://github.com/O-clock-Alumni/fiches-recap/blob/master/bdd/conception-04-mld.md), écrire le MLD de l'application !

## Bonus

Écrire le fichier SQL pour créer les tables listées dans le MLD.