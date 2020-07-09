const CoreModel = require('./CoreModel');

class Level extends CoreModel{
    _name;

    constructor(obj){
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

    set name(value){
        if(typeof value !== 'string') {
          throw Error("Level.id must be a string !");
        }
        this._name = value;
      }
    
}

module.exports = Level;