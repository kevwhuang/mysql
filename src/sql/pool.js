const mysql = require('mysql');

class Pool {
    constructor() {
        if (!this.pool) {
            this.pool = mysql.createPool({
                host: process.env.HOST,
                user: process.env.USERNAME,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,
                connectionLimit: 100,
                multipleStatements: true,
                debug: false,
            });
        }
        return this.pool;
    }
}

module.exports = new Pool();
