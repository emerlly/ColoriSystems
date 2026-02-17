require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');
const Quote = require('../src/models/QuoteModel');
const Product = require('../src/models/ProductModel');
const Customer = require('../src/models/CustomerModel');

async function run() {
  await mongoose.connect(process.env.DATABASE_URL);

  const product = await Product.findOne({ _id: '6963f0a02c0a1505d6a3d07c' });
  const customer = await Customer.findOne({ _id: '696c331ef2ddb6d93b539701' });

  await Quote.deleteMany();

  await Quote.create({
    customer: customer._id,
    items: [
      { product: product._id, quantity: 5, unitPrice: product.salePrice, totalPrice: product.salePrice * 5 },
    ],
    totalValue: product.salePrice * 5,
    status: 'draft',
    createdBy: customer._id,
    notes: 'Orçamento inicial para o cliente.',
  });

  console.log('Seed de orçamentos criado');
  await mongoose.disconnect();
}

run();
