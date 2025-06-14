const AdoptionModel = require('../models/adoptionModel');

class AdoptionService {
  // Registra uma nova adoção no banco de dados
  static async adopt(userId, petId) {
    return await AdoptionModel.create(userId, petId);
  }

  // Lista todas as adoções existentes (admin)
  static async list() {
    return await AdoptionModel.findAll();
  }
}

module.exports = AdoptionService;
