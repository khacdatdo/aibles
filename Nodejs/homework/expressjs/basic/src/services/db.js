import mysql from 'mysql';
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'aibles',
    multipleStatements: true
});

export default database;