require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');
const StockMovement = require('../src/models/StockModel');
const Product = require('../src/models/ProductModel');
const Sale = require('../src/models/SaleModel');

async function run() {
  await mongoose.connect(process.env.DATABASE_URL);
  const sale = await Sale.findOne({_id:'696c3d9ccd0be9ff53a3a277'});
  const product = await Product.findOne({_id: '6963f0a02c0a1505d6a3d07c'});

  await StockMovement.deleteMany();

  await StockMovement.create({
    product: product._id,
    quantity: product.stockQuantity,
    user: sale.customer,
    type: 'out',
  });

  console.log('Seed de estoque criado');
  await mongoose.disconnect();
}

run();