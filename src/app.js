const express = require('express');
const app = express();
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem vindo à API de Adoção de Pets!');
});

// Login com geração de token JWT
app.use('/auth', authRoutes);

// Cadastro de usuários
app.use('/users', userRoutes);

module.exports = app;
