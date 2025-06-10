// Define a rota pública de autenticação (login)
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// Rota para realizar login (retorna um token JWT se as credenciais forem válidas)
router.post('/login', AuthController.login);

module.exports = router;
