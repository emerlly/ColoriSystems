const Quote = require('../models/QuoteModel');
const Product = require('../models/ProductModel');
const StockMovement = require('../models/StocktModel');

class QuoteService {

  async createQuote(data, userId) {
    const { customer, items, notes } = data;

    if (!customer || !items || !items.length) {
      throw new Error('Cliente e itens são obrigatórios');
    }

    let totalValue = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) throw new Error('Produto não encontrado');
      if (!product.active) throw new Error(`Produto ${product.name} está inativo`);

      item.unitPrice = product.salePrice;
      item.totalPrice = product.salePrice * item.quantity;

      totalValue += item.totalPrice;
    }

    return Quote.create({
      customer,
      items,
      totalValue,
      createdBy: userId,
      notes
    });
  }

  async getAllQuotes() {
    return Quote.find()
      .populate('customer', 'name cpf')
      .populate('items.product', 'name code')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
  }

  async approveQuote(id) {
    const quote = await Quote.findById(id);
    if (!quote) throw new Error('Orçamento não encontrado');

    quote.status = 'approved';
    await quote.save();

    return quote
  }

  async convertQuoteToSale(quoteId, userId) {
    const quote = await Quote.findById(quoteId).populate('items.product');
    if (!quote) throw new Error('Orçamento não encontrado');
    if (quote.status !== 'approved') throw new Error('Apenas orçamentos aprovados podem ser convertidos em venda');

    //valdiar estoque
    for (const item of quote.items) {
      if (item.product.stockQuantity < item.quantity) {
        throw new Error(`Estoque insuficiente para o produto ${item.product.name}`);
      }
    }

    //criar movimentações de estoque
    const sale = await sale.create({
      customer: quote.customer,
      items: quote.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice
      })),
      totalValue: quote.totalValue,
      createdBy: userId,
      notes: `Venda convertida do orçamento ${quote._id}`
    });

    //atualizar estoque e registrar movimentações
    for (const item of quote.items) {
      const product = await item.product;
      product.stockQuantity -= item.quantity;
      await product.save();

      await StockMovement.create({
        type: 'out',
        product: product._id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        user: userId,
        notes: `Venda convertida do orçamento ${quote._id}`
      });
    }
    quote.status = 'converted';
    await quote.save();
    return { sale };
  };

  async cancelQuote(id) {
  return Quote.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
}

}

module.exports = new QuoteService();
