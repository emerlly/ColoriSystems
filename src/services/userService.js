
const User = require('../models/UserModel');
const validateCPF = require('../utils/validators/ValidateCPF');


class UserService {

  // Criar novo usuário
  async create(data) {
    if (!data.cpf) {
      throw new Error('CPF is required');
    }

    const cpf = data.cpf.replace(/\D/g, '');

    if (!validateCPF(cpf)) {
      throw new Error('Invalid CPF');
    }

    const exists = await User.findOne({ cpf });
    if (exists) {
      throw new Error('CPF already registered');
    }

    const user = await User.create({
      ...data,
      cpf
    });

    return user;
   
  }

  // Buscar todos os usuários ativos
  async findAll() {
    return User.find({ active: true }).sort({ name: 1 });
  }

  // resetarar senha do usuário
  async resetPassword(id, newPassword) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    user.password = newPassword;
    await user.save();
    return user;
  }

  // mudar nome do usuário
  async changeName(id, newName) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    user.name = newName;
    await user.save();
    return user;
  }
}

module.exports = new UserService();
