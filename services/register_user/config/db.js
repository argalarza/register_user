const mysql = require('mysql2');

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'login_system'
});

module.exports = db;
