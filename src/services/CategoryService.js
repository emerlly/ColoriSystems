const Category = require('../models/CategoryModel');

class CategoryService {
    static async create(data) {
        try {
            const category = new Category(data);
            await category.save();
            return { message: 'Categoria criada com sucesso' + category.data };
        } catch (error) {
            throw new Error('Erro ao criar categoria: ' + error.message);
        }
    };
    static async getAllCategories() {
        try {
            const categories = await Category.find();
            return categories;
        }catch (error) {
            throw new Error('Erro ao buscar categorias: ' + error.message);
        }
    }

};

module.exports = CategoryService;