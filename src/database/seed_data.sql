-- Seleciona o banco
USE loja_db;

-- Inserindo dois usuários (um admin e um adotante)
INSERT INTO users (name, email, password, phone, role)
VALUES 
('admin', 'admin@ifrs.edu.br', '123456', '54999999999', 'admin'),
('adopter', 'adopter@ifrs.edu.br', '123456', '54988888888', 'adopter');

-- Inserindo três pets disponíveis para adoção
INSERT INTO pets (name, age, species, size, status, description)
VALUES
('cachorro', 3, 'dog', 'medium', 'available', 'Cão brincalhão e vacinado.'),
('gato', 2, 'cat', 'small', 'available', 'Gatinha carinhosa, adora colo.'),
('cachorro 2', 5, 'dog', 'large', 'available', 'Muito protetor e amigável.');


-- Suponha que natan (id = 2) adotou o cachorro (id = 1)
-- Atualize o status do pet para 'adopted' e registre a adoção

-- 1. Atualizando o status do pet:
UPDATE pets
SET status = 'adopted'
WHERE id = 1;

-- 2. Inserindo a adoção:
INSERT INTO adoptions (user_id, pet_id, adoption_date)
VALUES (2, 1, '2025-06-01');