
const Product = require('../models/ProductModel');

class ProductService {
  // Buscar todos os produtos
  async findAll(companyId) {
    return Product.find({ companyId })
    .populate('category')
    .populate('supplier'); // Popula apenas o nome do fornecedor
  }

  // Buscar produto por ID
  async findById(id) {
    const product = await Product.findById(id)
    .populate('category')
    .populate('supplier');

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
    const category = await category.findOne({
      _id: data.categoryId,
      companyId: data.companyId,
    });

    if (!category) {
      throw new Error('Categoria não encontrada para esta empresa');
    }

    const supplier = await supplier.findOne({
      _id: data.supplierId,
      companyId: data.companyId,
    });
    if (!supplier) {
      throw new Error('Fornecedor não encontrado para esta empresa');
    }

    return await Product.create(data);
  
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
