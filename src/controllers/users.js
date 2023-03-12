const fs = require('fs/promises');
const mysql = require('mysql');
const path = require('path');

const errors = require('../sql/errors');
const pool = require('../sql/pool');

const read = (req, res) => {
    fs.readFile(path.join(__dirname, '../queries/select-all.sql'), 'utf8')
        .then(sql => {
            pool.query(sql, (err, results) => {
                if (err) return errors.errorServer(res, err);
                res.json(results);
            });
        });
};

const readSingle = (req, res) => {
    fs.readFile(path.join(__dirname, '../queries/select-single.sql'), 'utf8')
        .then(template => {
            const inserts = [Number(req.params.id)];
            const sql = mysql.format(template, inserts);

            pool.query(sql, (err, results) => {
                if (err) return errors.errorServer(res, err);
                if (!results.length) return errors.errorId(res, req.params.id);
                res.json(results[0]);
            });
        });
};

const create = (req, res) => {
    if (!req.body.first_name) return errors.errorMissing(res, 'first_name');
    if (!req.body.last_name) return errors.errorMissing(res, 'last_name');
    if (typeof req.body.first_name !== 'string') return errors.errorType(res, 'first_name', 'string');
    if (typeof req.body.last_name !== 'string') return errors.errorType(res, 'last_name', 'string');

    for (const field of ['phone1', 'phone2', 'email', 'address', 'city', 'county', 'state', 'zip']) {
        if (typeof req.body[field] !== 'undefined' && typeof req.body[field] !== 'string') {
            return errors.errorType(res, field, 'string');
        }
    }

    const template = 'INSERT INTO users (first_name, last_name) VALUES (?, ?); '
        + 'INSERT INTO usersContact (user_id, phone1, phone2, email) '
        + 'VALUES ((SELECT MAX(id) FROM users), ?, ?, ?); '
        + 'INSERT INTO usersAddress (user_id, address, city, county, state, zip) '
        + 'VALUES ((SELECT MAX(id) FROM users), ?, ?, ?, ?, ?); ';
    const inserts = [
        req.body.first_name,
        req.body.last_name,
        req.body.phone1,
        req.body.phone2,
        req.body.email,
        req.body.address,
        req.body.city,
        req.body.county,
        req.body.state,
        req.body.zip,
    ];
    const sql = mysql.format(template, inserts);

    fs.readFile(path.join(__dirname, '../queries/select-last.sql'), 'utf8')
        .then($select => {
            pool.query(sql + $select, (err, results) => {
                if (err) return errors.errorServer(res, err);
                res.json(results[3]);
            });
        });
};

const update = (req, res) => {
    if (!req.body.first_name) return errors.errorMissing(res, 'first_name');
    if (!req.body.last_name) return errors.errorMissing(res, 'last_name');
    if (typeof req.body.first_name !== 'string') return errors.errorType(res, 'first_name', 'string');
    if (typeof req.body.last_name !== 'string') return errors.errorType(res, 'last_name', 'string');

    const template = 'UPDATE users SET first_name = ?, last_name = ? WHERE id = ?; '
        + 'SELECT * FROM users WHERE id = ?';
    const inserts = [req.body.first_name, req.body.last_name, req.params.id, req.params.id];
    const sql = mysql.format(template, inserts);

    pool.query(sql, (err, results) => {
        if (err) return errors.errorServer(res, err);
        if (!results[0].affectedRows) return errors.errorId(res, req.params.id);
        res.json(results[1][0]);
    });
};

const del = (req, res) => {
    if (!req.body.first_name) return errors.errorMissing(res, 'first_name');
    if (typeof req.body.first_name !== 'string') return errors.errorType(res, 'first_name', 'string');

    const template = 'DELETE FROM users WHERE LCASE(first_name) = ?';
    const inserts = [req.body.first_name];
    const sql = mysql.format(template, inserts);
    let noun = 'entries';

    pool.query(sql, (err, results) => {
        if (err) return errors.errorServer(res, err);
        if (results.affectedRows === 1) noun = 'entry';
        res.json({ message: `${results.affectedRows} ${noun} deleted.` });
    });
};

module.exports = {
    read,
    readSingle,
    create,
    update,
    del,
};
