const Product = require('../models/ProductModel');

class ProductService {
  // Buscar todos os produtos
  async findAll() {
    return Product.find().populate('category');
  }

  // Buscar produto por ID
  async findById(id) {
    const product = await Product.findById(id).populate('category');
    if (!product) {
      throw new Error('Produto não encontrado');
    }
    return product;
  }

  // Criar produto
  async create(data) {
    // regra de negócio
    if (data.salePrice < data.costPrice) {
      throw new Error('Preço de venda não pode ser menor que o custo');
    }

    const product = await Product.create(data);
    return product;
  }

  // Atualizar produto
  async update(id, data) {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Produto não encontrado');
    }

    // regra opcional
    if (
      data.salePrice !== undefined &&
      data.costPrice !== undefined &&
      data.salePrice < data.costPrice
    ) {
      throw new Error('Preço de venda não pode ser menor que o custo');
    }

    Object.assign(product, data);
    await product.save();

    return product;
  }

  //  Desativar produto (delete lógico)
  async remove(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Produto não encontrado');
    }

    product.active = false;
    await product.save();

    return product;
  }
}

module.exports = new ProductService();
