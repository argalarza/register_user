const mysql = require('mysql2');

// Conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Función para obtener usuario por nombre de usuario
const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return reject(err);
      }
      resolve(results.length > 0 ? results[0] : null);
    });
  });
};

// Función para crear un nuevo usuario con contraseña encriptada
const createUser = (username, hashedPassword) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return reject(err);
      }
      resolve({ id: results.insertId, username });
    });
  });
};

module.exports = { getUserByUsername, createUser };
