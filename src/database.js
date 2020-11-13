const mysql = require('mysql');
const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (connection) connection.release();
    console.log('DB esta conectado');
    return;
});

module.exports = pool;