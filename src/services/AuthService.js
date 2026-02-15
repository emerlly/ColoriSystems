const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const validateCpf = require('../utils/validators/ValidateCPF');

class AuthService {
  async login({ email, password }) {
    const user = await User.findOne({ email }).select('+password  name active role companyId');

    if (!email || !password) {
      throw new Error('E-mail e senha são obrigatórios');
    }

    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Credenciais inválidas');
    }

    if (!user.active) {
      throw new Error('Usuário inativo', user);
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        companyId: user.companyId
      },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '1d' }
    );


    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyId: user.companyId
      }
    };
  }

  async register({ name, email, password, role, cpf, companyId }) {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('E-mail já cadastrado');
    }
    if (!name || !email || !password || !cpf) {
      throw new Error('Nome, e-mail, senha e CPF são obrigatórios');
    }
    if (password.length < 6 || password.length > 20) {
      throw new Error('A senha deve ter entre 6 e 20 caracteres');
    }
    if (!validateCpf(cpf)) {
      throw new Error('CPF inválido');
    }
    if (!companyId) {
      throw new Error('ID da empresa é obrigatório');
    }

    const user = new User({ name, email, cpf, password, role, companyId });
    await user.save();

    return { message: 'Usuário criado com sucesso' };
  }
}

module.exports = new AuthService();
