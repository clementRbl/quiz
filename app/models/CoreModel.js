const client = require("../database");

class CoreModel {
  _id;

  // Ici on attends un objet qui DOIT contenir l'id afin de pouvoir initialiser les variables de classe de CoreModel
  // Si on attendait un id, on aurait constructor(id)
  constructor(obj) {
    // Et donc si on avait un id on aurait
    // this._id = id
    this._id = obj.id;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    if (isNaN(parseInt(value, 10))) {
      throw Error("CoreModel.id must be an integer !");
      // on "lève" une erreur => ça arrête tout !
    }
    this._id = value;
  }

  static findAll(callback) {
    // On fait une requete SQL --> SELECT * FROM "user"
    client.query(`SELECT * FROM "${this.table}"`, (error, result) => {
      //Si on a une erreur
      if (error) {
        //Alors on déclenche la fonction de callback avec en premier paramètre l'erreur et comme on a une erreur, donc pas de résultat , on renvoie null sur le second paramètre
        callback(error, null);
        // Si on a pas d'erreur
      } else {
        // On créé un tableau de user vide
        const trueResult = [];
        // On parcours tout les résultats ( si y'en a )
        for (const row of result.rows) {
          // Pour chaque ligne trouvée dans la BDD, on instancie un nouveau user, en lui passant en paramètre la ligne de la BDD
          trueResult.push(new this(row));
        }
        // Puis on appel le callback, sans erreur ( 1ier param ) et on donne le tableau d'instances de user ( 2iem param )
        callback(null, trueResult);
      }
    });
  }

  static findById(id, callback) {
    // On fait une requete SQL ex -->  SELECT * FROM "user" WHERE id = 1
    client.query(
      `SELECT * FROM "${this.table}" WHERE id = $1`,
      [id],
      (error, result) => {
        // Une fois la requete éxecutée
        // Si y'a une erreur
        if (error) {
          // On appelle le callback en transmettant l'erreur et donc pas de résultat
          callback(error, null);
          //Si y'a pas d'erreur mais que y'a pas non plus de résultat
        } else if (result.rows.length === 0) {
          // On appelle le callback avec null partout
          callback(null, null);
        } else {
          // Sinon si pas d'erreur et si y'a du résultat
          // On instancie un User avec les données récupérées ( pg renvoie toujours un tableau sauf que la on a filtré par ID donc il y aura forcément au maximum qu'une seule ligne) alors on prends la première ligne du tableau qui représente l'objet que l'on cherche
          callback(null, new this(result.rows[0]));
        }
      }
    );
  }

  /**
   * Fonction permettant d'insérer un nouveau level
   * @param {function} callback
   */
  insert(callback) {
    if (this.id) {
      return callback(new Error("Ce niveau existe déjà"), null);
    }

    // Listes propriétés de l'objet en cours: Object.keys(this)
    //On a ("name") et  VALUES ($1) c'est pas opti, on veut le rendre dynamique, il faut donc générer un algo permettant de le rendre dynamique ( en utilisant la liste des champs depuis Object.keys(this))
    // Pour l'instant on ne fait que la variable fields
    // On devrai obtenir pour fields quelque chose comme :
    // fields = '"question", "anecdote", "wiki", "level_id", "answer_id", "quiz_id"'

    // Deuxième autonomie, créer la variable placeholders de facon à avoir quelque chose comme ceci : 
    // placeholders = '$1, $2, $3, $4, $5'

    // Troisième autonomie, créer la variable values qui contient toutes les values des variables dans le même ordre

    /**
     *  /!\ Attention aux propriétés d'objet
     *  monObj[key] !== monObj.key
     *  monObj[key] !== monObj['key']
     *  monObjet.key === monObjet['key']
     */

    const _cleanFields = [];
    const _cleanPlaceholders = [];
    const values = [];
    let placeHolderInc = 1;

    // Je parcours ma liste de propriété de classe
    Object.keys(this).forEach((key) => {
        // Je supprime l'underscore car il n'y est pas en BDD
        key = key.replace('_', '');
        // Si jamais le champs est id, je ne l'ajoute pas dans les key car je ne veux pas donner une valeur à id
        // Donc on return false pour cette itération et on passe à l'itération suivante
        if (key === "id") return false;

        // Je push une key formatée avec des double quotes dans mon tableau de champs formatté
        _cleanFields.push(`"${key}"`);
        // Je push l'incrément en cours de placeHolder ( qui correspond à la clef )
        _cleanPlaceholders.push(`$${placeHolderInc}`);
        // Je push la value de la key en cours dans le tableau values
        values.push(this[key]);
        placeHolderInc++;
    });
    // Ici je joins tout ces champs formatés par le bias d'une virgule afin d'avoir un string et non plus un tableau
    const fields = _cleanFields.join(', ');
    const placeholders = _cleanPlaceholders.join(', ');

    // Préparation de la requeter SQL Insert -->
    // INSERT INTO "level" ("name") VALUES ('Ultra dur') RETURNING "id"
    const query = {
      text: `
        INSERT INTO "${this.constructor.table}"
        (${fields}) 
        VALUES (${placeholders}) 
        RETURNING "id"
      `,
      values: values,
    };

    client.query(query, (err, result) => {
      if (err) {
        return callback(err, null);
      }

      if (result.rowCount) {
        // grace à `RETURNING RETURNING "id", "created_at"`, on peut récupérer l'id et la date de création de l'objet nouvellement inséré
        // on a plus qu'à le mettre dans l'objet courant
        this.id = result.rows[0].id;
        // puis on appelle le callback en lui passant l'instance courante
        callback(null, this);
      } else {
        // si pas de retour, il s'est passé quelquechose de bizarre...
        callback("Insert did not return any id.", this);
      }
    });
  }

  /**
   * Fonction permettant de mettre à jour l'instance en BDD
   * @param {function} callback
   */
  update(callback) {
    // Préparation de la query

    const _cleanPlaceholders = [];
    let incPlaceHolders = 1;
    const values = [];
    Object.keys(this).forEach((key) => {
        key = key.replace('_', '');
        if (key === "id") return false;

        _cleanPlaceholders.push(`"${key}" = $${incPlaceHolders}`);
        values.push(this[key]);
        incPlaceHolders++;
    });
    values.push(this.id);
    const placeholders = _cleanPlaceholders.join(', ');

    const query = {
      text: `
        UPDATE "${this.constructor.table}" SET 
        ${placeholders}
        WHERE "id" = $${incPlaceHolders}
      `,
      values: values,
    };

    // Execution de la query
    client.query(query, (err, result) => {
      // Si erreur on callback avec err en param
      if (err) {
        callback(err, null);
      }

      //Si au moins une ligne a été modifié => tout va bien !
      if (result.rowCount) {
        callback(null, this);
      }
      // Si rowCount vaut 0 c'est que rien n'a été modifié, donc il y a surement eu un problème ou on cherche à modifier quelquechose par son identique
      else {
        callback("Update did not target any rows", this);
      }
    });
  }

  delete(callback) {
      // constructor représente la classe elle même auquel on accède depuis l'instance this --> this.constructor
    const query = {
      text: `DELETE FROM "${this.constructor.table}" WHERE id=$1`,
      values: [this.id],
    };
    client.query(query, (err, result) => {
      if (err) {
        callback(err, null);
      }
      if (result.rowCount) {
        // au moins une ligne a été supprimé => tout va bien !
        callback(null, true);
      } else {
        callback("Delete did not target any rows", this);
      }
    });
  }
}

module.exports = CoreModel;
