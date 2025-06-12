const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

class UserService {
  // Cria um novo usuário no banco (com senha criptografada)
  static async register(userData) {
    return await UserModel.create(userData);
  }

  // Lista todos os usuários
  static async getAll() {
    return await UserModel.findAll();
  }

  // Busca um usuário por ID
  static async getById(id) {
    return await UserModel.findById(id);
  }

  // Atualiza dados do usuário (nome, email, telefone e opcionalmente senha)
  static async update(id, userData) {
    return await UserModel.update(id, userData);
  }

  // Remove um usuário do banco
  static async remove(id) {
    return await UserModel.delete(id);
  }

  // Realiza login, verifica senha e retorna um token JWT com o ID do usuário
  static async loginUser(email, password) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error('Usuário não encontrado');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Senha incorreta');

    const payload = {
      userId: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token, userId: user.id };
  }
}

module.exports = UserService;
