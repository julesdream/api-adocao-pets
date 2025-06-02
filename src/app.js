const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.send('API Adocao de Pets');
});

// Exporta a instância do Express corretamente
module.exports = app;