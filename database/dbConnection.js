let config = require('./../config');
let mysql = require('mysql');

module.exports = {
    connect: () => {
        return new Promise((resolve, reject) => {
            const conn = mysql.createConnection({
                host     : config.db.host,
                user     : config.db.user,
                password : config.db.password,
                database : config.db.dbName
            });
    
            // connect to database with the config above
            conn.connect((err) => {
                if (err) {
                    reject(err);
                }

                resolve(conn);
            });
        });
    },

    disconnect: (conn) => {
        conn.destroy();
    }
};