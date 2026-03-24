const mysql = require("mysql2");
require('dotenv').config();

const port = process.env.port;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ApiAct3'
});
    
const db = connection.promise();

connection.connect(err => {
    if(err) throw err;
    console.log(`Conectado al puerto ${port}`)
})

module.exports = db;