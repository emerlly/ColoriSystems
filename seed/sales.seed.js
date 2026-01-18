require('dotenv').config();
const mongoose = require('mongoose');
const Sale = require('../src/models/SaleModel');
const Product = require('../src/models/ProductModel');
const Customer = require('../src/models/CustomerModel');
const User = require('../src/models/UserModel');

async function run() {
  await mongoose.connect(process.env.DATABASE_URL);

  const product = await Product.findOne();
  const customer = await Customer.findOne();
  const seller = await User.findOne({ role: 'seller' });

  await Sale.deleteMany();

  await Sale.create({
    customer: customer._id,
    seller: seller._id,
    items: [
      { product: product._id, quantity: 2, unitPrice: product.salePrice }
    ],
    totalValue: product.salePrice * 2,
    paymentMethod: 'PIX'
  });

  console.log('Seed de vendas criado');
  await mongoose.disconnect();
}

run();
