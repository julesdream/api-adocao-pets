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
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Erro ao criar usuário: ${error.message}` });
    }
  }

  // Lista todos os usuários (admin)
  static async list(req, res) {
    try {
      const users = await UserService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro ao listar usuários: ${error.message}` });
    }
  }

  // Busca um usuário pelo ID (admin ou o próprio usuário)
  static async findById(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const loggedUser = req.user;

      if (loggedUser.role !== 'admin' && loggedUser.userId !== userId) {
        return res.status(403).json({
          message: 'Acesso negado: você só pode acessar sua própria conta.',
        });
      }

      const user = await UserService.getById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro ao buscar usuário: ${error.message}` });
    }
  }

  // Atualiza dados de um usuário (admin ou o próprio usuário)
  static async update(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const loggedUser = req.user;

      if (loggedUser.role !== 'admin' && loggedUser.userId !== userId) {
        return res.status(403).json({
          message: 'Acesso negado: você só pode atualizar sua própria conta.',
        });
      }

      await UserService.update(userId, req.body);
      return res
        .status(200)
        .json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Erro ao atualizar usuário: ${error.message}` });
    }
  }

  // Remove um usuário (admin)
  static async remove(req, res) {
    try {
      await UserService.remove(parseInt(req.params.id));
      return res.status(200).json({ message: 'Usuário removido com sucesso.' });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Erro ao remover usuário: ${error.message}` });
    }
  }
}

module.exports = UserController;
