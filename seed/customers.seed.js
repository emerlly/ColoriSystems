require('dotenv').config();
const mongoose = require('mongoose');
const Customer = require('../src/models/CustomerModel');

async function run() {
  await mongoose.connect(process.env.DATABASE_URL);

  await Customer.deleteMany();

  await Customer.create([
    { name: 'Cliente 1', cpf: '11111111111', phone: '11999991111', email: 'cliente1@example.com' },
    { name: 'Cliente 2', cpf: '22222222222', phone: '11999992222', email: 'cliente2@example.com' }
  ]);

  console.log('Seed de clientes criado');
  await mongoose.disconnect();
}

run();
