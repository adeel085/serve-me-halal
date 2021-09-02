
module.exports = {

    getRestaurantsLocation: (conn, query, limit = 30) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT DISTINCT address FROM restaurants WHERE address LIKE '%${query}%' LIMIT ${limit}`;
            conn.query(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    },

    getFoodTypes: (conn, query, limit = 30) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT DISTINCT cuisine AS data FROM restaurants WHERE cuisine LIKE '%${query}%' LIMIT ${limit}`;
            conn.query(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    sql = `SELECT DISTINCT name AS data FROM restaurants WHERE name LIKE '%${query}%' LIMIT ${limit}`;
                    conn.query(sql, [], (err2, rows2) => {
                        if (err2)
                            resolve(rows);
                        else {
                            let mergedResult = [];
                            for(let i = 0; i < rows.length || i < rows2.length; i++) {
                                if (i < rows.length) {
                                    mergedResult.push(rows[i]);
                                }
                                if (i < rows2.length) {
                                    mergedResult.push(rows2[i]);
                                }
                            }
                            resolve(mergedResult);
                        }
                    });
                }
            });
        });
    },

    getRestaurantByZipAndFoodType: (conn, foodType, zipCode) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM restaurants WHERE (cuisine LIKE '%${foodType}%' OR name LIKE '%${foodType}%') AND zip_code = '${zipCode}'`;
            conn.query(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    },

    getRestaurantsByLocationAndFoodType: (conn, foodType, location) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM restaurants WHERE (cuisine LIKE '%${foodType}%' OR name LIKE '%${foodType}%') AND address LIKE '%${location}%'`;
            conn.query(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    },

    getRestaurantsByLocation: (conn, location) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM restaurants WHERE address LIKE '%${location}%'`;
            conn.query(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    },

    getRestaurantById: (conn, id) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM restaurants WHERE id=${id}`;
            conn.query(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows[0]);
            });
        });
    }
};