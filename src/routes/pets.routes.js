// Rotas para listagem, cadastro, edição e remoção de pets
const express = require('express');
const PetController = require('../controllers/pets.controller');
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/auth.middleware');

const router = express.Router();

// Rota pública para listar apenas os pets disponíveis para adoção
router.get('/available', PetController.listAvailable);

// Rota protegida para listar todos os pets (admin)
router.get('/', authenticateToken, authorizeRole('admin'), PetController.list);

// Rota para buscar detalhes de um pet por ID (admin)
router.get(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  PetController.findById
);

// Rota para cadastrar um novo pet (admin)
router.post(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  PetController.create
);

// Rota para atualizar os dados de um pet (admin)
router.put(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  PetController.update
);

// Rota para remover um pet (admin, se o pet ainda estiver disponível)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  PetController.remove
);

module.exports = router;
