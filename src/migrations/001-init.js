require('dotenv').config();
const mongoose = require('mongoose');

// Carrega os models (isso já cria os índices unique)
require('../models/UserModel');
require('../models/ProductModel');
require('../models/CategoryModel');
require('../models/SupplierModel');
require('../models/CustomerModel');
require('../models/StockModel');

async function run() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log(' Conectado no MongoDB');

    const db = mongoose.connection.db;

    //  Índices APENAS de performance
    await db.collection('stockmovements').createIndex({ createdAt: -1 });
    await db.collection('stockmovements').createIndex({ product: 1 });
    await db.collection('stockmovements').createIndex({ type: 1 });

    console.log(' Migration 001 executada com sucesso');
  } catch (error) {
    console.error(' Erro ao executar migration:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
