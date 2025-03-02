const express = require('express');
const cors = require('cors');
const { registerUser } = require('./controllers/registercontroller');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Ruta para registrar usuarios
app.post('/register', registerUser);

app.listen(PORT, () => {
  console.log(`Register service running on port ${PORT}`);
});
