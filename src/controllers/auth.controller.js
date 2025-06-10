const UserService = require('../services/userService');
// Responsável por lidar com autenticação via JWT

class AuthController {
  // Realiza o login do usuário com email e senha
  // Se válido, retorna um token JWT
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: 'E-mail e senha são obrigatórios.' });
      }

      const {token, userId }= await UserService.loginUser(email, password); // Gera o token JWT
      return res.status(200).json({ token, userId });
    } catch {
      return res.status(401).json({
        message:
          'Falha na autenticação. Verifique o e-mail e a senha e tente novamente.',
      });
    }
  }
}

module.exports = AuthController;
