require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../src/models/ProductModel');
const Category = require('../src/models/CategoryModel');

async function run() {
  await mongoose.connect(process.env.DATABASE_URL);

  const categories = await Category.find();

  await Product.deleteMany();

  await Product.create([
    {
      code: '30000152',
      name: 'Copo Inox',
      description: 'Camada dupla 650ml',
      category: categories[0]._id,
      costPrice: 7.5,
      salePrice: 35,
      stockQuantity: 25,
      minStock: 5
    }
  ]);

  console.log('Seed de produtos criado');
  await mongoose.disconnect();
}

run();
