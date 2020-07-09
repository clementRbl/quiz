const client = require('./database');
const Level = require('./models/Level');

const dataMapper = {

    getAllLevels: (callback) => {
        client.query('SELECT * FROM level', (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                const levels = [];
                for (const row of result.rows) {
                    levels.push(new Level(row));
                }
                callback(null, levels);
            }
        });
    },

    getOneLevel: (id, callback) => {
        client.query('SELECT * FROM level WHERE id = $1', [id], (error, result) => {
            if (error) {
                callback(error, null);
            } else if (result.rows.length === 0) {
                callback(null, null);
            } else {
                callback(null, new Level(result.rows[0]));
            }
        });
    }

};

module.exports = dataMapper;