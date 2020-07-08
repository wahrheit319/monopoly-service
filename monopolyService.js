/**
 * This module implements a REST-inspired webservice for the Monopoly DB.
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

// Configure the server and its routes.

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
router.use(express.json());

router.get("/", getHelloMessage);
router.get("/players", readPlayers);
router.get("/players/:id", readPlayer);
router.put("/players/:id", updatePlayer);
router.post('/players', createPlayer);
router.delete('/players/:id', deletePlayer);

app.use(router);
app.use(errorHandler);
app.listen(port, () => console.log(`Listening on port ${port}`));

// Implement the CRUD operations.

function errorHandler(err, req, res) {
    if (app.get('env') === "development") {
        console.log(err);
    }
    res.sendStatus(err.status || 500);
}

function returnDataOr404(res, data) {
    if (data == null) {
        res.sendStatus(404);
    } else {
        res.send(data);
    }
}

function getHelloMessage(req, res) {
    res.send('Hello, CS 262 Monopoly service!');
}

function readPlayers(req, res, next) {
    db.many("SELECT * FROM Player")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}

function readPlayer(req, res, next) {
    db.oneOrNone(`SELECT * FROM Player WHERE id=${req.params.id}`)
        .then(data => {
            returnDataOr404(res, data);
        })
        .catch(err => {
            next(err);
        });
}

function updatePlayer(req, res, next) {
    db.oneOrNone(`UPDATE Player SET email=$(email), name=$(name) WHERE id=${req.params.id} RETURNING id`, req.body)
        .then(data => {
            returnDataOr404(res, data);
        })
        .catch(err => {
            next(err);
        });
}

function createPlayer(req, res, next) {
    db.one(`INSERT INTO Player(email, name) VALUES ($(email), $(name)) RETURNING id`, req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        });
}

function deletePlayer(req, res, next) {
    db.oneOrNone(`DELETE FROM Player WHERE id=${req.params.id} RETURNING id`)
        .then(data => {
            returnDataOr404(res, data);
        })
        .catch(err => {
            next(err);
        });
}
