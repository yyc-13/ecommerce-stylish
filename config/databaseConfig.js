var mysql = require('mysql2');
require('dotenv').config();

config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
}

var connection = mysql.createConnection(config);
connection.connect(function (err) {
  if (err) {
    console.log('error connecting:' + err.stack);
  }
  console.log('connected to DB successfully.');
});

module.exports = {
  connection: mysql.createConnection(config)
}