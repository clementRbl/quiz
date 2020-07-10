const CoreModel = require('./CoreModel');
const client = require('../database');

class User extends CoreModel {

    // Nom de la table
  static table = "user";
  static showPassword = true;

    _email;
    _password;
    _firstname;
    _lastname;

    constructor(obj = {}) {
        // Ici on passe l'objet à super ( le constructeur du parent)
        // Afin qu'il puisse récupérer ce dont il a besoin
        super(obj);

        // Mais on peut lui passer tout simplement l'id à la place ( si il attend un id )
        // super(obj.id);
        this._email = obj.email;
        this._password = obj.password;
        this._firstname = obj.firstname;
        this._lastname = obj.lastname;
    }

    /**********
   * SETTER
   **********/

    set email(value) {
        if (typeof value !== 'string') {
            throw Error("User.email must be a string !");
        }
        this._email = value;
    }

    set password(value) {
        if (typeof value !== 'string') {
            throw Error("User.password must be a string !");
        }
        this._password = value;
    }

    set firstname(value) {
        if (typeof value !== 'string') {
            throw Error("User.firstname must be a string !");
        }
        this._firstname = value;
    }

    set lastname(value) {
        if (typeof value !== 'string') {
            throw Error("User.lastname must be a string !");
        }
        this._lastname = value;
    }

    /**********
     * GETTER
     **********/

    get email() {
        return this._email;
    }

    get password() {
        if (User.showPassword){
            return this._password;
        }
        else return '***************';
    }

    get firstname() {
        return this._firstname;
    }

    get lastname() {
        return this._lastname;
    }

    get fullname() {
        return this._firstname + ' ' + this._lastname;
    }

//----------------------------
    static findAll(callback) {
        // On fait une requete SQL --> SELECT * FROM "user"
        client.query(`SELECT * FROM "${User.table}"`, (error, result) => {
          //Si on a une erreur
          if (error) {
            //Alors on déclenche la fonction de callback avec en premier paramètre l'erreur et comme on a une erreur, donc pas de résultat , on renvoie null sur le second paramètre
            callback(error, null);
            // Si on a pas d'erreur
          } else {
            // On créé un tableau de user vide
            const users = [];
            // On parcours tout les résultats ( si y'en a )
            for (const row of result.rows) {
              // Pour chaque ligne trouvée dans la BDD, on instancie un nouveau user, en lui passant en paramètre la ligne de la BDD
              users.push(new User(row));
            }
            // Puis on appel le callback, sans erreur ( 1ier param ) et on donne le tableau d'instances de user ( 2iem param )
            callback(null, users);
          }
        });
      }
//----------------------------
      static findById(id, callback) {
        // On fait une requete SQL ex -->  SELECT * FROM "user" WHERE id = 1
        client.query(
          `SELECT * FROM "${User.table}" WHERE id = $1`,
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
              callback(null, new User(result.rows[0]));
            }
          }
        );
      }
//----------------------------
    insert(callback) {
        if (this.id) {
            return callback(new Error("Cet utilisateur existe déjà"), null);
        }
        // Préparation de la requeter SQL Insert
        const query = {
        text: `
            INSERT INTO "${User.table}"
            (email,password,firstname,lastname) 
            VALUES ($1,$2,$3,$4) 
            RETURNING "id"
        `,
        values: [this.email, this._password, this.firstname, this.lastname],
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
//----------------------------
    update(callback) {
        // Préparation de la query
        const query = {
          text: `
            UPDATE "${User.table}" SET 
            "email" = $2,
            "password" = $3,
            "firstname" = $4,
            "lastname" = $5
            WHERE "id" = $1
          `,
          values: [
              this.id, 
              this.email, 
              this._password, 
              this.firstname, 
              this.lastname
            ],
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
//----------------------------
      delete(callback) {
        const query = {
          text: `DELETE FROM "${User.table}" WHERE id=$1`,
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

module.exports = User;