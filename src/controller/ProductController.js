const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
  try {
    const result = await ProductService.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar produto', error: error.message });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await ProductService.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: 'Erro ao buscar produto', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await ProductService.update(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar produto', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await ProductService.remove(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao desativar produto', error: error.message });
  }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };