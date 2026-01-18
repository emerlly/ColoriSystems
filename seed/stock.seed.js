require('dotenv').config();
const mongoose = require('mongoose');
const Stock = require('../src/models/StockModel');
const Product = require('../src/models/ProductModel');

async function run() {
  await mongoose.connect(process.env.DATABASE_URL);

  const product = await Product.findOne();

  await Stock.deleteMany();

  await Stock.create({
    product: product._id,
    quantity: product.stockQuantity
  });

  console.log('Seed de estoque criado');
  await mongoose.disconnect();
}

run();
