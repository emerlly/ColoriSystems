
const Customer = require('../models/CustomerModel');
const validateCPF = require('../utils/validators/ValidateCPF');


class CustomerService {

  // Criar novo cliente
  async create(data) {
    if (!data.cpf) {
      throw new Error('CPF is required');
    }

    const cpf = data.cpf.replace(/\D/g, '');

    if (!validateCPF(cpf)) {
      throw new Error('Invalid CPF');
    }

    const exists = await Customer.findOne({ cpf });
    if (exists) {
      throw new Error('CPF already registered');
    }

    const customer = await Customer.create({
      ...data,
      cpf
    });

    return customer;
  }

  // Buscar todos os clientes ativos
  async findAll() {
    return Customer.find({ active: true }).sort({ name: 1 });
  }
}

module.exports = new CustomerService();
