const mysql = require("mysql2");
require('dotenv').config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const port = process.env.port;

const connection = mysql.createConnection({
  host: `${dbHost}`,
  user: `${dbUser}`,
  password: `${dbPass}`,
  database: `${dbName}`,
});
    
const db = connection.promise();

connection.connect(err => {
    if(err) throw err;
    console.log(`Conectado al puerto ${port}`)
})

module.exports = db;