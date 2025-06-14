const db = require('../config/database');
// Model responsável pelas operações de banco de dados relacionadas as adoções

class AdoptionModel {
  // Cria uma nova adoção se o pet estiver disponível e ainda não tiver sido adotado por esse usuário
  static async create(userId, petId) {
    const [existing] = await db.query(
      'SELECT * FROM adoptions WHERE user_id = ? AND pet_id = ?',
      [userId, petId]
    );
    if (existing.length > 0) throw new Error('Pet já adotado por este usuário');

    const [pet] = await db.query('SELECT * FROM pets WHERE id = ?', [petId]);
    if (pet.length === 0 || pet[0].status !== 'available') {
      throw new Error('Pet indisponível para adoção');
    }

    await db.query('UPDATE pets SET status = ? WHERE id = ?', [
      'adopted',
      petId,
    ]);
    const [result] = await db.query(
      'INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES (?, ?, ?)',
      [userId, petId, new Date()]
    );
    return result.insertId;
  }

  // Retorna todas as adoções com dados do usuário e do pet envolvidos
  static async findAll() {
    const [rows] = await db.query(
      `SELECT a.id, u.name AS adopter, p.name AS pet, a.adoption_date
       FROM adoptions a
       JOIN users u ON u.id = a.user_id
       JOIN pets p ON p.id = a.pet_id`
    );
    return rows;
  }
}

module.exports = AdoptionModel;
