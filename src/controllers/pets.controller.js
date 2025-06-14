const PetService = require('../services/petsService');
// Controller responsável pelas ações de pets

class PetController {
  // Lista apenas os pets disponíveis para adoção (público)
  static async listAvailable(req, res) {
    try {
      const pets = await PetService.listAvailable();
      return res.status(200).json(pets);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro ao listar pets disponíveis: ${error.message}` });
    }
  }

  // Lista todos os pets disponíveis e adotados (admin)
  static async list(req, res) {
    try {
      const pets = await PetService.list();
      return res.status(200).json(pets);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro ao listar pets: ${error.message}` });
    }
  }

  // Busca o pet no banco de dados pelo ID (admin)
  static async findById(req, res) {
    try {
      const pet = await PetService.get(parseInt(req.params.id));
      if (!pet) {
        return res.status(404).json({ message: 'Pet não encontrado.' });
      }
      return res.status(200).json(pet);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro ao buscar pet: ${error.message}` });
    }
  }

  // Cria um novo pet com os dados recebidos (admin)
  static async create(req, res) {
    try {
      const id = await PetService.create(req.body);
      return res
        .status(201)
        .json({ message: 'Pet cadastrado com sucesso.', id });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Erro ao cadastrar pet: ${error.message}` });
    }
  }

  // Atualiza os dados do pet (admin)
  static async update(req, res) {
    try {
      await PetService.update(parseInt(req.params.id), req.body);
      return res.status(200).json({ message: 'Pet atualizado com sucesso.' });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Erro ao atualizar pet: ${error.message}` });
    }
  }

  // Remove o pet do banco (admin)
  static async remove(req, res) {
    try {
      await PetService.remove(parseInt(req.params.id));
      return res.status(200).json({ message: 'Pet removido com sucesso.' });
    } catch (error) {
      // Erro específico se o pet não estiver disponível
      const status = error.message === 'Pet não pode ser removido' ? 403 : 400;

      return res
        .status(status)
        .json({ message: `Erro ao remover pet: ${error.message}` });
    }
  }
}

module.exports = PetController;
