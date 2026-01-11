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

module.exports = { createCustomer, getAllCustomers };
