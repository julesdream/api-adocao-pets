const db = require('../config/database');
const bcrypt = require('bcryptjs');
// Model responsável pelas operações de banco de dados dos usuários

class UserModel {
  // Busca um usuário pelo e-mail (usado no login)
  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);
    return rows[0];
  }

  // Cadastra um novo usuário com senha criptografada
  static async create(user) {
    const { name, email, password, phone, role } = user;
    const hash = await bcrypt.hash(password, 10);
    const userRole = role === 'admin' ? 'admin' : 'adopter';
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, hash, phone, userRole]
    );
    return result.insertId;
  }
}

module.exports = UserModel;
