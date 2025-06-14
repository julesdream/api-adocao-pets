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

      const { token, userId } = await UserService.loginUser(email, password); // Gera o token JWT
      return res.status(200).json({ token, userId });
    } catch (error) {
      // Define o status apropriado com base na mensagem de erro
      const status =
        error.message === 'Usuário não encontrado' ||
        error.message === 'Senha incorreta'
          ? 401
          : 500;

      return res.status(status).json({
        message:
          error.message || 'Falha na autenticação. Tente novamente mais tarde.',
      });
    }
  }
}

module.exports = AuthController;
