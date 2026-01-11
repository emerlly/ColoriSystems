require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/UserModel');

async function seedAdmin() {
  await mongoose.connect(process.env.DATABASE_URL);

  const exists = await User.findOne({ email: 'admin@admin.com' });
  if (exists) {
    console.log('Admin já existe');
    process.exit(0);
  }

  await User.create({
    name: 'Emerlly',
    cpf: '05286571190',
    email: 'admin@admin.com',
    password: '123456',
    role: 'admin',
    active: true
  });

  console.log(' Admin criado com sucesso');
  process.exit(0);
}

seedAdmin();
