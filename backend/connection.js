var mysql = require("mysql2");

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'db',
    user: 'root',
    password: 'db9999!'
});

module.exports = connection;
