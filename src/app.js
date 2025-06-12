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

// Rotas da aplicação
app.use('/auth', authRoutes); // Login e autenticação
app.use('/users', userRoutes); // Cadastro e gerenciamento de usuários

module.exports = app;
