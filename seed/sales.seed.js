require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');
const Sale = require('../src/models/SaleModel');

const Quote = require('../src/models/QuoteModel');

async function run() {
  await mongoose.connect(process.env.DATABASE_URL);

  const quote = await Quote.findOne({_id: '696c35c272e362ede7394c7b'});

  await Sale.deleteMany();


  console.log('quote', quote);

  await Sale.create({
    customer: quote.customer,
    seller: quote.createdBy,
    items: [
      { product: quote.items[0].product, quantity: 2, unitPrice: quote.items[0].unitPrice, totalPrice: quote.totalValue },
    ],
    totalValue: quote.items[0].totalPrice,
    paymentMethod: 'pix'
  });

  console.log('Seed de vendas criado');
  await mongoose.disconnect();
}

run();
