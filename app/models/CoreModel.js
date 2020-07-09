class CoreModel {
    _id;

    // Ici on attends un objet qui DOIT contenir l'id afin de pouvoir initialiser les variables de classe de CoreModel
    // Si on attendait un id, on aurait constructor(id)
    constructor(obj) {
        // Et donc si on avait un id on aurait
        // this._id = id
        this._id = obj.id
    }

    get id() {
        return this._id;
    };

    set id(value) {
        if (isNaN(parseInt(value, 10))) {
            throw Error("CoreModel.id must be an integer !");
            // on "lève" une erreur => ça arrête tout !
        }
        this._id = value;
    };
};

module.exports = CoreModel;