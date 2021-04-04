const mysql = require('mysql');

function getNewConnection() {
    return mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Pa$$w0rd',
        database: '202101-im215-rest',
        multipleStatements: true,
    });
}

module.exports = getNewConnection();