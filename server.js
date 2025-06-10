// Arquivo responsável por subir o servidor da aplicação
require('dotenv').config();

const app = require('./src/app'); // Importa a aplicação configurada

const PORT = process.env.PORT || 3000; // Usa a porta definida no .env ou 3000 como padrão

// Inicia o servidor
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor rodando na porta ${PORT}`);
});
