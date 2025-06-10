const UserService = require('../services/userService');
// Controller responsável por lidar com as requisições de usuários

class UserController {
  // Cria um novo usuário no sistema
  static async create(req, res) {
    try {
      const id = await UserService.register(req.body);
      return res
        .status(201)
        .json({ message: 'Usuário criado com sucesso.', id });
    } catch (err) {
      return res
        .status(400)
        .json({ message: `Erro ao criar usuário: ${err.message}` });
    }
  }
}

module.exports = UserController;
