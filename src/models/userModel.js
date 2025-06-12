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

  // Busca um usuário pelo ID (usado para ver perfil ou atualizar)
  static async findById(id) {
    const [rows] = await db.query(
      'SELECT id, name, email, phone, role FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }
  // Lista todos os usuários (excluindo senha)
  static async findAll() {
    const [rows] = await db.query(
      'SELECT id, name, email, phone, role FROM users'
    );
    return rows;
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

  // Atualiza dados do usuário
  static async update(id, user) {
    const { name, email, phone, password } = user;

    if (password) {
      const bcrypt = require('bcryptjs');
      const hash = await bcrypt.hash(password, 10);
      await db.query(
        'UPDATE users SET name = ?, email = ?, phone = ?, password = ? WHERE id = ?',
        [name, email, phone, hash, id]
      );
    } else {
      // Caso não queira atualizar a senha
      await db.query(
        'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?',
        [name, email, phone, id]
      );
    }
  }

  // Remove um usuário pelo ID
  static async delete(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  }
}

module.exports = UserModel;
