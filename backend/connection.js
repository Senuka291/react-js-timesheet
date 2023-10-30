var mysql = require("mysql2");

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'aaw',
    user: 'root',
    password: 'aaw9999!'
});

module.exports = connection;