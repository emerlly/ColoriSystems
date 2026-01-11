//const Supplier = require('../models/SupplierModel');
const SupplierService = require('../services/SupplierService');

const createSupplier = async (req, res) => {
  try {
    const supplier = await SupplierService.create(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar fornecedor', error: error.message });
  }
};

const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await SupplierService.getAllSuppliers();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar fornecedores', error: error.message });
  }
};

module.exports = { createSupplier, getAllSuppliers };
