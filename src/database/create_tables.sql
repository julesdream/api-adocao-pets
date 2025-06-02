-- Seleciona o banco de dados
USE pets_db;

-- Criação da tabela de usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(1024) NOT NULL,
    phone VARCHAR(20),
    role ENUM('admin', 'adopter') NOT NULL
);

-- Criação tabela de pets
CREATE TABLE pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    species VARCHAR(50) NOT NULL,
    size ENUM('small', 'medium', 'large') NOT NULL,
    status ENUM('available', 'adopted') NOT NULL,
    description TEXT NULL
);

-- Criação da tabela de adoções
CREATE TABLE adoptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pet_id INT NOT NULL,
    adoption_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (pet_id) REFERENCES pets(id)
);