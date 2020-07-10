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
}

module.exports = User;