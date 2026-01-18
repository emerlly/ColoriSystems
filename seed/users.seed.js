require('dotenv').config();require('dotenv').config({path: '../.env'});const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/UserModel');

async function run() {
  await mongoose.connect(process.env.DATABASE_URL);

  const password = await bcrypt.hash('123456', 10);

  await User.deleteMany();

  await User.create([
    { name: 'Vendedor', email: 'seller@colori.com', password, role: 'seller', cpf: '98765432100' },
    { name: 'Operador', email: 'operator@colori.com', password, role: 'operator', cpf: '45678912300' },
    { name: 'customer', email: 'customer@colori.com', password, role: 'customer', cpf: '12345678900' }
  ]);

  console.log('Seed de usuários criado');
  await mongoose.disconnect();
}

run();
