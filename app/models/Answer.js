const CoreModel = require('./CoreModel');

class Answer extends CoreModel {
    _description;
    _question_id;

    constructor(obj) {
        // Ici on passe l'objet à super ( le constructeur du parent)
        // Afin qu'il puisse récupérer ce dont il a besoin
        super(obj);

        // Mais on peut lui passer tout simplement l'id à la place ( si il attend un id )
        // super(obj.id);
        this._description = obj.description;
        this._question_id = obj.question_id;
    }

    /**********
   * SETTER
   **********/

    set description(value) {
        if (typeof value !== 'string') {
            throw Error("Answer.description must be a string !");
        }
        this.description = value;
    }

    set question_id(value) {
        if (isNaN(parseInt(value, 10))) {
            throw Error("Answer.question_id must be an integer !");
        }
        this.question_id = value;
    }

    /**********
     * GETTER
     **********/

    get description() {
        return this.description;
    }

    get question_id() {
        return this.question_id;
    }
}

module.exports = Answer;