const CoreModel = require('./CoreModel');

class Quiz extends CoreModel {
    _title;
    _description;
    _user_id;

    constructor(obj) {
        // Ici on passe l'objet à super ( le constructeur du parent)
        // Afin qu'il puisse récupérer ce dont il a besoin
        super(obj);

        // Mais on peut lui passer tout simplement l'id à la place ( si il attend un id )
        // super(obj.id);
        this._title = obj.title;
        this._description = obj.description;
        this._user_id = obj.user_id;
    }

    /**********
   * SETTER
   **********/

    set title(value) {
        if (typeof value !== 'string') {
            throw Error("Quiz.title must be a string !");
        }
        this._title = value;
    }

    set description(value) {
        if (typeof value !== 'string') {
            throw Error("Quiz.description must be a string !");
        }
        this._description = value;
    }

    set user_id(value) {
        if (!isNaN(parseInt(value, 10))) {
            throw Error("Quiz.user_id must be an integer !");
        }
        this._user_id = value;
    }

    /**********
     * GETTER
     **********/

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get user_id() {
        return this._user_id;
    }
}

module.exports = Quiz;