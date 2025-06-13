const db = require('../config/database');
// Model responsável pelas operações de banco de dados relacionadas aos pets

class PetModel {
  // Retorna todos os pets disponíveis para adoção
  static async findAllAvailable() {
    const [rows] = await db.query(
      "SELECT * FROM pets WHERE status = 'available'"
    );
    return rows;
  }

  // Retorna todos os pets (inclusive os adotados)
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM pets');
    return rows;
  }

  // Retorna um pet específico pelo ID
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);
    return rows[0];
  }

  // Cadastra um novo pet no banco de dados com status inicial 'available'
  static async create(pet) {
    const { name, age, species, size, description } = pet;
    const [result] = await db.query(
      'INSERT INTO pets (name, age, species, size, status, description) VALUES (?, ?, ?, ?, ?, ?)',
      [name, age, species, size, 'available', description || null]
    );
    return result.insertId;
  }

  // Atualiza os dados de um pet existente
  static async update(id, pet) {
    const { name, age, species, size, description } = pet;
    await db.query(
      'UPDATE pets SET name = ?, age = ?, species = ?, size = ?, description = ? WHERE id = ?',
      [name, age, species, size, description, id]
    );
  }

  // Remove um pet do banco de dados (se não tiver sido adotado)
  static async delete(id) {
    await db.query('DELETE FROM pets WHERE id = ?', [id]);
  }
}

module.exports = PetModel;
