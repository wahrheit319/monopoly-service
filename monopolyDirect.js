/**
 * This module implements direct, Android-to-Postgres access to the Monopoly DB.
 * The database is hosted on ElephantSQL.
 *
 * @author: kvlinden
 * @date: Summer, 2020
 */

// Set up the database connection.
const pgp = require('pg-promise')();
const db = pgp({
    host: "salt.db.elephantsql.com",
    port: 5432,
    database: "kfwlavxr",
    user: "kfwlavxr",
    password: "B4YX-hcBCVykNE2CbouRoqzM5we0kMyM"
});

// Send the SQL command directly to Postgres.
db.many("SELECT * FROM Player")
    .then(function (data) {
        console.log(data);
    })
    .catch(function (error) {
        console.log('ERROR:', error)
    });
