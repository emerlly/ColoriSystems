const Sale = require('../models/SaleModel');
const Product = require('../models/ProductModel');
const StockService = require('./StockService');

class SaleService {

  async createSale(data, userId) {
    const { customer, items, paymentMethod, notes } = data;

    if (!customer || !items || !items.length) {
      throw new Error('Cliente e itens são obrigatórios');
    }

    let totalValue = 0;

    // 🔍 validar estoque e calcular totais
    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        throw new Error('Produto não encontrado');
      }

      if (!product.active) {
        throw new Error(`Produto ${product.name} está inativo`);
      }

      if (product.stockQuantity < item.quantity) {
        throw new Error(`Estoque insuficiente para ${product.name}`);
      }

      item.unitPrice = product.salePrice;
      item.totalPrice = product.salePrice * item.quantity;

      totalValue += item.totalPrice;
    }

    // 💾 registrar venda
    const sale = await Sale.create({
      customer,
      items,
      totalValue,
      paymentMethod,
      seller: userId,
      notes
    });

    // 📦 registrar movimentação de saída
    for (const item of items) {
      await StockService.registerMovement(
        {
          type: 'out',
          product: item.product,
          quantity: item.quantity,
          customer,
          paymentMethod,
          unitPrice: item.unitPrice,
          notes: `Venda ID ${sale._id}`
        },
        userId
      );
    }

    return sale;
  }

  async getAllSales() {
    return Sale.find()
      .populate('customer', 'name cpf')
      .populate('items.product', 'name code')
      .populate('seller', 'name role')
      .sort({ createdAt: -1 });
  }

  async getSaleById(id) {
    const sale = await Sale.findById(id)
      .populate('customer')
      .populate('items.product')
      .populate('seller', 'name');

    if (!sale) throw new Error('Venda não encontrada');

    return sale;
  }

}

module.exports = new SaleService();
