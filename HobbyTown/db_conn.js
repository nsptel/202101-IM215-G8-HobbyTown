const mysql = require('mysql');

function getNewConnection() {
    return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Pa$$w0rd',
        database: '202101-im215-hobbytown',
        multipleStatements: true,
    });
}

module.exports = getNewConnection();