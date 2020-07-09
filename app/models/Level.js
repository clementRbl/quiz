const CoreModel = require("./CoreModel");
const client = require("../database");
class Level extends CoreModel {
  // Nom de la table
  static table = "level";

  _name;

  constructor(obj) {
    // Ici on passe l'objet à super ( le constructeur du parent)
    // Afin qu'il puisse récupérer ce dont il a besoin
    super(obj);

    // Mais on peut lui passer tout simplement l'id à la place ( si il attend un id )
    // super(obj.id);
    this._name = obj.name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (typeof value !== "string") {
      throw Error("Level.id must be a string !");
    }
    this._name = value;
  }

  /**
   * Fonction permettant de récupérer un tableau de tous les levels
   * @param {function} callback
   */
  static findAll(callback) {
    // On fait une requete SQL --> SELECT * FROM "level"
    client.query(`SELECT * FROM "${Level.table}"`, (error, result) => {
      //Si on a une erreur
      if (error) {
        //Alors on déclenche la fonction de callback avec en premier paramètre l'erreur et comme on a une erreur, donc pas de résultat , on renvoie null sur le second paramètre
        callback(error, null);
        // Si on a pas d'erreur
      } else {
        // On créé un tableau de levels vide
        const levels = [];
        // On parcours tout les résultats ( si y'en a )
        for (const row of result.rows) {
          // Pour chaque ligne trouvée dans la BDD, on instancie un nouveau level, en lui passant en paramètre la ligne de la BDD
          levels.push(new Level(row));
        }
        // Puis on appel le callback, sans erreur ( 1ier param ) et on donne le tableau d'instances de level ( 2iem param )
        callback(null, levels);
      }
    });
  }

  /**
   * Fonction permettant de récupérer un level suivant son ID
   * @param {number} id
   * @param {function} callback
   * @returns void
   */
  static findById(id, callback) {
    // On fait une requete SQL ex -->  SELECT * FROM "level" WHERE id = 1
    client.query(
      `SELECT * FROM "${Level.table}" WHERE id = $1`,
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
          // On instancie un Level avec les données récupérées ( pg renvoie toujours un tableau sauf que la on a filtré par ID donc il y aura forcément au maximum qu'une seule ligne) alors on prends la première ligne du tableau qui représente l'objet que l'on cherche
          callback(null, new Level(result.rows[0]));
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
    // Préparation de la requeter SQL Insert -->
    // INSERT INTO "level" ("name") VALUES ('Ultra dur') RETURNING "id"
    const query = {
      text: `
        INSERT INTO "${Level.table}"
        ("name") 
        VALUES ($1) 
        RETURNING "id"
      `,
      values: [this.name],
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
    const query = {
      text: `
        UPDATE "${Level.table}" SET 
        "name" = $1
        WHERE "id" = $2
      `,
      values: [this.name, this.id],
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

  /**
   * Fonction permettant de supprimer un niveau
   * @param {function} callback 
   */
  delete(callback) {
    const query = {
      text: `DELETE FROM "${Level.table}" WHERE id=$1`,
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

module.exports = Level;
