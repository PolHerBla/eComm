const mysql = require("mysql2");
const port = 8080;

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