const CoreModel = require('./CoreModel');

class Question extends CoreModel {

    static table = "question";

    _question;
    _anecdote;
    _wiki;
    _level_id;
    _answer_id;
    _quiz_id;

    constructor(obj) {
        // Ici on passe l'objet à super ( le constructeur du parent)
        // Afin qu'il puisse récupérer ce dont il a besoin
        super(obj);

        // Mais on peut lui passer tout simplement l'id à la place ( si il attend un id )
        // super(obj.id);
        this._question = obj.question;
        this._anecdote = obj.anecdote;
        this._wiki = obj.wiki;
        this._level_id = obj.level_id;
        this._answer_id = obj.answer_id;
        this._quiz_id = obj.quiz_id;
    }

  /**********
  * SETTER
  **********/

    set question(value) {
        if (typeof value !== 'string') {
            throw Error("Question.question must be a string !");
        }
        this._question = value;
    }

    set anecdote(value) {
        if (typeof value !== 'string') {
            throw Error("Question.anecdote must be a string !");
        }
        this._anecdote = value;
    }

    set wiki(value) {
        if (typeof value !== 'string') {
            throw Error("Question.wiki must be a string !");
        }
        this._wiki = value;
    }

    set level_id(value) {
        if (isNaN(parseInt(value, 10))) {
            throw Error("Question.level_id must be an integer !");
        }
        this._level_id = value;
    }

    set answer_id(value) {
        if (isNaN(parseInt(value, 10))) {
            throw Error("Question.answer_id must be an integer !");
        }
        this._answer_id = value;
    }

    set quiz_id(value) {
        if (isNaN(parseInt(value, 10))) {
            throw Error("Question.quiz_id must be an integer !");
        }
        this._quiz_id = value;
    }

    /**********
     * GETTER
     **********/

    get question() {
        return this._question;
    }

    get anecdote() {
        return this._anecdote;
    }

    get wiki() {
        return this._wiki;
    }

    get level_id() {
        return this._level_id;
    }

    get answer_id() {
        return this._answer_id;
    }

    get quiz_id() {
        return this._quiz_id;
    }

}

module.exports = Question;