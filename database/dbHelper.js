
module.exports = {

    getRestaurantsLocation: (conn, query, limit = 30) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT DISTINCT address FROM restaurants WHERE address LIKE '%${query}%' AND (approved = 'true') LIMIT ${limit}`;
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
            let sql = `SELECT DISTINCT cuisine AS data FROM restaurants WHERE cuisine LIKE '%${query}%' AND (approved = 'true') LIMIT ${limit}`;
            conn.query(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    sql = `SELECT DISTINCT name AS data FROM restaurants WHERE name LIKE '%${query}%' AND (approved = 'true') LIMIT ${limit}`;
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
            let sql = `SELECT * FROM restaurants WHERE (cuisine LIKE '%${foodType}%' OR name LIKE '%${foodType}%') AND zip_code = '${zipCode}' AND (approved = 'true')`;
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
            let sql = `SELECT * FROM restaurants WHERE (cuisine LIKE '%${foodType}%' OR name LIKE '%${foodType}%') AND address LIKE '%${location}%' AND (approved = 'true')`;
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
            let sql = `SELECT * FROM restaurants WHERE address LIKE '%${location}%' AND (approved = 'true')`;
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
    },

    addNewUser: (conn, name, email, password, type) => {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO users(name, email, password, type) VALUES(?,?,?,?)`;
            conn.query(sql, [name, email, password, type], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows[0]);
            });
        })
    },

    getUserByEmail: (conn, email) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE email = ? LIMIT 1`;
            conn.query(sql, [email], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows[0]);
            });
        })
    },

    getUserByID: (conn, userID) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE id = ? LIMIT 1`;
            conn.query(sql, [userID], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows[0]);
            });
        })
    },

    getUserByEmailPassword: (conn, email, password) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1`;
            conn.query(sql, [email, password], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows[0]);
            });
        })
    },

    addClaimRequest: (conn, userID, restaurantID, name, phone, email, website, status) => {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO claim_requests(user_id, restaurant_id, name, phone, email, website, status) VALUES(?,?,?,?,?,?,?)`;
            conn.query(sql, [userID, restaurantID, name, phone, email, website, status], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows[0]);
            });
        })
    },

    getMyBusinesses: (conn, userID) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM restaurants WHERE user_id = ? AND approved = 'true'`;
            conn.query(sql, [userID], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        })
    },

    getOwnerByRestaurantID: (conn, userID, restaurantID, status) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM claim_requests WHERE user_id = ? AND restaurant_id = ? AND status = ?`;
            conn.query(sql, [userID, restaurantID, status], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows[0]);
            });
        })
    },

    getPendingClaimRequests: (conn) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM claim_requests WHERE status = ?`;
            conn.query(sql, ["pending"], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });            
        })
    },

    getClaimRequests: (conn) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM claim_requests WHERE status != 'denied' `;
            conn.query(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });            
        })
    },    

    updateClaimRequest: (conn, restaurantID, status, userID) => {
        return new Promise((resolve,reject) => {

            let sql = `UPDATE claim_requests SET status = ? WHERE restaurant_id = ? AND status != 'denied' `
            conn.query(sql, ["pending", restaurantID], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    let sql = `UPDATE claim_requests SET status = ? WHERE restaurant_id = ? AND user_id = ?`
                    conn.query(sql, [status, restaurantID, userID], (err, rows) => {
                        if (err)
                            reject(err);
                        else {
                            let sql = `UPDATE restaurants SET user_id = ? WHERE id = ?`;
                                conn.query(sql, [userID, restaurantID], (err, rows) => {
                                if (err)
                                    reject(err);
                                else
                                    resolve(rows);
                            });
                        }
                    });     
                }                    
            });              
        })
    },

    updateRestaurant: (conn, name, description, cuisine, website, facebook, phone, address, halalStatus, workingHours, latitude, longitude, imageLink, zipcode, restaurantID) => {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE restaurants SET name = ?, description = ?, cuisine = ?,
                       website = ?, facebook = ?, phone = ?, address = ?, halal_status = ?,
                       working_hours = ?, latitude = ?, longitude = ?, image_link = ?, zip_code = ?
                       WHERE id = ?`;
            conn.query(sql, [name, description, cuisine, website, facebook, phone, address, halalStatus, workingHours, latitude, longitude, imageLink, zipcode, restaurantID], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
                });     
        })
    },

    addNewRestaurant: (conn, name, description, cuisine, website, facebook, phone, address, halalStatus, workingHours, latitude, longitude, imageLink, zipCode, userID, approved) => {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO restaurants(name, description, cuisine, website, facebook,
                       phone, address, halal_status, working_hours, latitude, longitude, image_link,
                       zip_code, user_id, approved) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            conn.query(sql, [name, description, cuisine, website, facebook, phone, address, halalStatus, workingHours, latitude, longitude, imageLink, zipCode, userID, approved], (err, rows) => {
                if (err) {
                    reject(err);
                }                
                else {
                    resolve(rows[0]);
                }
            });
        })
    },

    addNewRestaurantRequest: (conn, name, description, cuisine, website, facebook, phone, address, halalStatus, workingHours, latitude, longitude, imageLink, zipCode, userID, approved) => {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO restaurants(name, description, cuisine, website, facebook,
                       phone, address, halal_status, working_hours, latitude, longitude, image_link,
                       zip_code, user_id, approved) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            conn.query(sql, [name, description, cuisine, website, facebook, phone, address, halalStatus, workingHours, latitude, longitude, imageLink, zipCode, userID, approved], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows[0]);
            });  
        })
    },

    getRestaurantRequests: (conn) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM restaurants WHERE user_id != 0 AND approved = 'false'`;
            conn.query(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        })
    },

    deleteRestaurant: (conn, restaurantID) => {
        return new Promise((resolve, reject) => {
            let sql = `DELETE FROM restaurants WHERE id = ?`;
            conn.query(sql, [restaurantID], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        })
    },

    approveRestaurant: (conn, restaurantID) => {
        return new Promise((resolve, reject) => {
        let sql = `UPDATE restaurants SET approved = 'true' WHERE id = ?`;
            conn.query(sql, [restaurantID], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        })
    }
};