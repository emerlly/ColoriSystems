const CategoryService = require('../services/CategoryService');

const createCategory = async (req, res) => {
  try {
    const result = await CategoryService.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar categoria', error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar categorias', error: error.message });
  }
};

module.exports = { createCategory, getAllCategories };