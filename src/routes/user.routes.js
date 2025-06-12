// Rotas para cadastro, listagem e manutenção de usuários
const express = require('express');
const UserController = require('../controllers/user.controller');
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/auth.middleware');
const router = express.Router();

// Rota para cadastro de novo usuário (pública)
router.post('/', UserController.create);

// Rota para listar todos os usuários (admin)
router.get('/', authenticateToken, authorizeRole('admin'), UserController.list);

// Rota para buscar um usuário por ID (admin ou o próprio usuário)
router.get('/:id', authenticateToken, UserController.findById);

// Rota para atualizar os dados de um usuário (admin ou o próprio usuário)
router.put('/:id', authenticateToken, UserController.update);

// Rota para remover um usuário (somente admin)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  UserController.remove
);

module.exports = router;
