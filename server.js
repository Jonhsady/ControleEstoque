const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(routes);

const startServer = async () => {
  try {
    const database = require('./db');
    const Produto = require('./src/models/produto');

    // Sincronizar o banco de dados
    await database.sync();

    // Buscar todos os produtos (apenas como exemplo, pode ser removido se não for necessário)
    const produtos = await Produto.findAll();

    app.listen(port, function() {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error('Unable to sync database:', error);
  }
};

// Chama a função para iniciar o servidor
startServer();
