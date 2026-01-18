require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');
const Supplier = require('../src/models/SupplierModel');

async function run() {
  await mongoose.connect(process.env.DATABASE_URL);

  await Supplier.deleteMany();

  await Supplier.create([
    { name: 'Fornecedor 1', document: '11222333000181', documentType: 'CNPJ', phone: '11999990001' },
    { name: 'Fornecedor 2', document: '22333444000182', documentType: 'CNPJ', phone: '11999990002' }
  ]);

  console.log('Seed de fornecedores criado');
  await mongoose.disconnect();
}

run();
