const PetModel = require('../models/petsModel');

class PetService {
  // Retorna somente os pets com status 'available' (pública)
  static async listAvailable() {
    return await PetModel.findAllAvailable();
  }

  // Lista todos os pets (admin)
  static async list() {
    return await PetModel.findAll();
  }

  // Busca um pet por ID
  static async get(id) {
    return await PetModel.findById(id);
  }

  // Cadastra um novo pet no banco
  static async create(pet) {
    return await PetModel.create(pet);
  }

  // Atualiza os dados de um pet
  static async update(id, data) {
    return await PetModel.update(id, data);
  }

  // Remove um pet, se ele estiver disponível para adoção
  static async remove(id) {
    const pet = await PetModel.findById(id);
    if (pet.status !== 'available') {
      throw new Error('Pet não pode ser removido');
    }
    return await PetModel.delete(id);
  }
}

module.exports = PetService;
