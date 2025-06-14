const AdoptionService = require('../services/adoptionService');
// Controller responsável por lidar com as requisições relacionadas às adoções

class AdoptionController {
  // Extrai o ID do usuário autenticado e o ID do pet enviado no corpo da requisição, e registra a adoção
  static async create(req, res) {
    try {
      const userId = req.user.userId;
      const petId = req.body.petId;
      const id = await AdoptionService.adopt(userId, petId);
      return res
        .status(201)
        .json({ message: 'Adoção registrada com sucesso.', id });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Erro ao registrar adoção: ${error.message}` });
    }
  }

  // Lista todas as adoções registradas no sistema (admin)
  static async list(req, res) {
    try {
      const adoptions = await AdoptionService.list();
      return res.status(200).json(adoptions);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro ao listar adoções: ${error.message}` });
    }
  }
}

module.exports = AdoptionController;
