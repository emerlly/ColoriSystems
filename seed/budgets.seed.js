require('dotenv').config();
const mongoose = require('mongoose');
const Quote = require('../src/models/QuoteModel');
const Product = require('../src/models/ProductModel');
const Customer = require('../src/models/CustomerModel');

async function run() {
  await mongoose.connect(process.env.DATABASE_URL);

  const product = await Product.findOne();
  const customer = await Customer.findOne();

  await Quote.deleteMany();

  await Quote.create({
    customer: customer._id,
    items: [
      { product: product._id, quantity: 5, unitPrice: product.salePrice }
    ],
    totalValue: product.salePrice * 5,
    status: 'pending'
  });

  console.log('Seed de orçamentos criado');
  await mongoose.disconnect();
}

run();
