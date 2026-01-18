require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');
const Customer = require('../src/models/CustomerModel');

async function run() {
  await mongoose.connect(process.env.DATABASE_URL);

  await Customer.deleteMany();

  await Customer.create([
    { name: 'Cliente 1', document: '11111111111', documentType: 'CPF', phone: '11999991111', email: 'cliente1@example.com' },
    { name: 'Cliente 2', document: '22222222222', documentType: 'CPF', phone: '11999992222', email: 'cliente2@example.com' }
  ]);

  console.log('Seed de clientes criado');
  await mongoose.disconnect();
}

run();
