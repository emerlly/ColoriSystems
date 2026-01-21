const mongoose = require('mongoose');
const Product = require('../models/ProductModel');
const StockMovement = require('../models/StockModel');

class StockService {
  async registerMovement(data, userId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const {
        type,
        product: productId,
        quantity,
        supplier,
        customer,
        unitPrice,
        paymentMethod,
        notes
      } = data;

      // validações básicas
      if (!['in', 'out', 'adjustment'].includes(type)) {
        throw new Error('Tipo de movimentação inválido');
      }

      if (quantity <= 0) {
        throw new Error('Quantidade deve ser maior que zero');
      }

      const product = await Product.findById(productId).session(session);
      if (!product) {
        throw new Error('Produto não encontrado');
      }

      if (!product.active && type === 'out') {
        throw new Error('Produtos inativos não podem ser vendidos');
      }

      if (type === 'out' && product.stockQuantity < quantity) {
        throw new Error('Estoque insuficiente');
      }

      // cálculo do novo estoque
      let newQuantity = product.stockQuantity;

      if (type === 'in') newQuantity += quantity;
      if (type === 'out') newQuantity -= quantity;
      if (type === 'adjustment') newQuantity = quantity;

      product.stockQuantity = newQuantity;
      await product.save({ session });

      const movement = await StockMovement.create(
        [
          {
            type,
            product: productId,
            quantity,
            supplier,
            customer,
            unitPrice:
              unitPrice ??
              (type === 'out' ? product.salePrice : product.costPrice),
            paymentMethod,
            user: userId,
            notes
          }
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      let alert = null;
      if (product.stockQuantity <= product.minStock) {
        alert = `Alerta: Produto ${product.name} abaixo do estoque mínimo (${product.minStock}). Saldo atual: ${product.stockQuantity}`;
      }

      return { movement: movement[0], alert };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async getStockStatus() {
    return Product.find({ active: true })
      .select('name code stockQuantity minStock')
      .sort({ name: 1 });
  }

  async getMovementsHistory(filters = {}) {
    const query = {};

    if (filters.product) query.product = filters.product;
    if (filters.type) query.type = filters.type;
    if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      if (filters.startDate) query.createdAt.$gte = filters.startDate;
      if (filters.endDate) query.createdAt.$lte = filters.endDate;
    }

    return StockMovement.find(query)
      .populate('product', 'name code')
      .populate('user', 'name')
      .populate('supplier', 'name')
      .populate('customer', 'name')
      .sort({ createdAt: -1 });
  }

  async salesBySeller(startDate, endDate) {
    return StockMovement.aggregate([
      {
        $match: {
          type: 'out',
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: '$user',
          totalSales: { 
            $sum: { 
              $multiply: 
              ['$quantity', '$unitPrice'] 
            } 
          }
        }
      },
      {
        $lookup:{
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'seller'
        }
      },
      {
        $unwind: '$seller'
      },{
        $project: {
          _id: 0,
          sellerName: '$seller.name',
          role: '$seller.role',
          totalItensSold: 1,
          totalValueSold: 1
        }
      }
      
    ])
  }
}

module.exports = new StockService();
