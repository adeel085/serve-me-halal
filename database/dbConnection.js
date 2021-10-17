let config = require('./../config');
let mysql = require('mysql');
const fs = require('fs');

module.exports = {
    connect: () => {
        return new Promise((resolve, reject) => {
            const conn = mysql.createConnection({
                host     : config.db.host,
                user     : config.db.user,
                password : config.db.password,
                database : config.db.dbName,
                // ssl  : {
                //     ca : fs.readFileSync(__dirname + '\\ca-certificate.crt')
                // }
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