// Define as rotas protegidas para ações de adoção
const express = require('express');
const AdoptionController = require('../controllers/adoption.controller');
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/auth.middleware');

const router = express.Router();

// Rota para listar todas as adoções (admin)
router.get(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  AdoptionController.list
);

// Rota para registrar uma nova adoção (adopter)
router.post(
  '/',
  authenticateToken,
  authorizeRole('adopter'),
  AdoptionController.create
);

module.exports = router;
