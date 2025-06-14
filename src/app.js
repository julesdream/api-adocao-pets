// Configuração principal da aplicação Express
const express = require('express');
const app = express();
require('dotenv').config();

// Importa rotas da aplicação
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const petRoutes = require('./routes/pets.routes');
const adoptionRoutes = require('./routes/adoptions.routes');

app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem vindo à API de Adoção de Pets!');
});

// Rotas da aplicação
app.use('/auth', authRoutes); // Login e autenticação
app.use('/users', userRoutes); // Cadastro e gerenciamento de usuários
app.use('/pets', petRoutes); // Cadastro e gerenciamento de pets
app.use('/adoptions', adoptionRoutes); // Adoção de pets

module.exports = app;
