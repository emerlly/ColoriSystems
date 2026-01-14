const Category = require('../models/CategoryModel');

class CategoryService {

  static async create(data) {
    if (!data.name) {
      throw new Error('Nome da categoria é obrigatório');
    }

    const exists = await Category.findOne({ name: data.name });
    if (exists) {
      throw new Error('Categoria já existe');
    }

    const category = new Category(data);
    await category.save();

    return category;
  }

  static async getAllCategories() {
    return Category.find();
  }

  static async getCategoryById(id) {
    const category = await Category.findById(id);

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    return category;
  }
}

module.exports = CategoryService;
