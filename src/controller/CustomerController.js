const Customer = require('../services/CustomerService');

const createCustomer = async (req, res) => {
  try {
    const custmoer = await Customer.create(req.body);
    res.status(201).json(custmoer);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar cliente', error: error.message });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes', error: error.message });
  }
};

// reset senha
const resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    const customer = await Customer.resetPassword(id, newPassword);
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao resetar senha', error: error.message });
  }
}

// reset name
const resetName = async (req, res) => {
  try {
    const { id } = req.params;
    const { newName } = req.body;
    const customer = await Customer.resetName(id, newName);
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao resetar nome', error: error.message });
  }
}

// desativar cliente
const deactivateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.deactivateCustomer(id);
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao desativar cliente', error: error.message });
  }
}
module.exports = { createCustomer, getAllCustomers };
