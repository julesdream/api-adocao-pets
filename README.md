# 🐱 Adoção API (em desenvolvimento)
Esta é uma API RESTful desenvolvida em **Node.js** com **Express**, que gerencia o processo de adoção de pets. Ela permite cadastrar usuários, gerenciar pets, realizar adoções e autenticar com JWT.

---

## 🚀 Funcionalidades

- Listar todos os pets (não implementada)
- Listar/Atualizar/Remover um pet com ID (não implementada)
- **Cadastrar usuários**
- Listar todos os usuários (não implementada)
- Listar/Atualizar/Remover um usuário com ID (não implementada)
- **Realiza login com retorno de token JWT**
- Realiza adoção de um pet (não implementada)

 >⚠️ Funcionalidades não implementadas serão entregues em etapas futuras.
---

## 🛠 Tecnologias
- Node.js
- Express
- MySQL2
- JWT (jsonwebtoken)
- BcryptJS
- Dotenv
- ESLint + Prettier (padronização de código)
- Nodemon (ambiente de desenvolvimento)

---

## ⚙️ Como executar

1. Clone o repositório

```bash
git clone https://github.com/julesdream/api-adocao-pets.git
cd api-adocao-pets
```

2. Instale as dependências:

```bash
npm install
npm install --save-dev nodemon eslint prettier
npm install --save-dev eslint-plugin-prettier eslint-config-prettier
npm init @eslint/config@latest
```

3. Configure o banco de dados:
- Rode os scripts:
- `create_database.sql`
- `create_tables.sql`
- `seed_data.sql`
- Crie um arquivo `.env` com:
```env
PORT=3000
JWT_SECRET=sua_chave_secreta
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=adocao
```

4. Inicie o servidor:
```bash
npm run dev
```

5. Teste os endpoints com o arquivo:
```
tests/pets_api_test.rest
```

## 📁 Estrutura resumida

```
api-adocao-pets/
├── server.js
├── .env
├── README.md
├── tests/                  # Arquivos com testes de rotas 
│   ├── user_api_test.rest  # Testes de cadastro e login de usuários          
├── src/
│   ├── app.js              # Configuração principal do Express
│   ├── config/             # Conexão com o banco de dados
│   ├── controllers/        # Lógica das requisições
│   ├── middlewares/        # Autenticação e autorização JWT
│   ├── models/             # Acesso direto ao banco (queries SQL)
│   ├── routes/             # Definição das rotas
│   └── services/           # Regra de negócio
```

## 🧹 Padrões de Código
- ESLint + Prettier integrados
- Formatado automaticamente ao salvar
- Configurado para usar LF como quebra de linha (.editorconfig)

---
## 📜 Licença
Uso livre para fins educacionais e profissionais.