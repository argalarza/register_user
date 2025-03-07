const bcrypt = require('bcryptjs');
const axios = require('axios');
const { getUserByUsername, createUser } = require('../models/user'); // Asegúrate de que la ruta sea correcta

const registerUser = async (req, res) => {
  const { username, password, captcha } = req.body; // Ahora recibimos captcha desde el body de la solicitud

  try {
    // Verificar el CAPTCHA con Google
    const secretKey = '6LemWOwqAAAAANRM3ImojV8UaeZWpSTZFuUd0NzX'; // Clave secreta obtenida de Google
    const captchaResponse = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: secretKey,
        response: captcha, // Enviamos el token de captcha que el cliente ha enviado
      },
    });

    // Si la verificación del CAPTCHA falla
    if (!captchaResponse.data.success) {
      return res.status(400).json({ message: 'CAPTCHA no válido. Por favor intente de nuevo.' });
    }

    // Verificar si el nombre de usuario ya está registrado
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya está registrado.' });
    }

    // Hashear la contraseña antes de almacenarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario con la contraseña encriptada
    const newUser = await createUser(username, hashedPassword);

    // Respuesta con el usuario creado
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });

  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { registerUser };
