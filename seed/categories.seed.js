require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');
const Category = require('../src/models/CategoryModel');

async function run() {
  await mongoose.connect(process.env.DATABASE_URL);

  await Category.deleteMany();

  await Category.create([
    { name: 'Xícaras', description: 'XICARAS TESTE' },
    { name: 'Copos', description: 'COPOS TESTE' },
    { name: 'Garrafas', description: 'GARARAFAS TESTE' }
  ]);

  console.log('Seed de categorias criado');
  await mongoose.disconnect();
}

run();
