const bcrypt = require('bcryptjs');
const { getUserByUsername, createUser } = require('../models/user'); // Asegúrate de que la ruta sea correcta

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hashear la contraseña antes de almacenarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario con la contraseña encriptada
    const newUser = await createUser(username, hashedPassword);

    res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser };
