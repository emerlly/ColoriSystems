require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');
const Order = require('../src/models/OrderModel');

async function run() {
  await mongoose.connect(process.env.DATABASE_URL);

await Order.create([
    {}
])
}

console.log('Seed de pedidos criado');

await mongoose.disconnect();

run();