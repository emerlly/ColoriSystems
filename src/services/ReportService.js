const e = require('express');
const Product = require('../models/ProductModel');
const StockMovement = require('../models/StockModel');

class ReportService {

  async salesByPeriod(startDate, endDate) {
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
          _id: null,
          totalSales: {
            $sum: { $multiply: ['$quantity', '$unitPrice'] }
          },
          totalItemsSold: { $sum: '$quantity' }
        }
      }
    ]);
  }

  async salesByProduct(startDate, endDate) {
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
          _id: '$product',
          totalQuantity: { $sum: '$quantity' },
          totalValue: {
            $sum: { $multiply: ['$quantity', '$unitPrice'] }
          }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $project: {
          _id: 0,
          product: '$product.name',
          totalQuantity: 1,
          totalValue: 1
        }
      }
    ]);
  }

  async lowStockProducts() {
    return Product.find({
      active: true,
      $expr: { $lte: ['$stockQuantity', '$minStock'] }
    }).populate('category', 'name');
  }

  async profitByPeriod(startDate, endDate) {
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
          _id: null,
          totalRevenue: {
            $sum: { $multiply: ['$quantity', '$unitPrice'] }
          },
          totalCost: {
            $sum: { $multiply: ['$quantity', '$costPrice'] }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          totalCost: 1,
          profit: { $subtract: ['$totalRevenue', '$totalCost'] }
        }
      }
    ]);
  }

  async exportToExcel(startDate, endDate) {
    // Buscar vendas no período
    const movements = await StockMovement.find({
      type: 'out',
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    })
      .populate('product', 'name code')
      .populate('customer', 'name')
      .populate('user', 'name')
      .sort({ createdAt: 1 });

    // Criar planilha
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Relatório de Vendas');

    // Cabeçalho
    worksheet.columns = [
      { header: 'Data', key: 'date', width: 20 },
      { header: 'Produto', key: 'product', width: 30 },
      { header: 'Código', key: 'code', width: 15 },
      { header: 'Quantidade', key: 'quantity', width: 15 },
      { header: 'Valor Unitário', key: 'unitPrice', width: 18 },
      { header: 'Valor Total', key: 'total', width: 18 },
      { header: 'Cliente', key: 'customer', width: 25 },
      { header: 'Usuário', key: 'user', width: 20 }
    ];

    // Dados
    movements.forEach(m => {
      worksheet.addRow({
        date: m.createdAt.toLocaleString('pt-BR'),
        product: m.product?.name || '-',
        code: m.product?.code || '-',
        quantity: m.quantity,
        unitPrice: m.unitPrice,
        total: m.quantity * m.unitPrice,
        customer: m.customer?.name || '-',
        user: m.user?.name || '-'
      });
    });

    // Estilo simples no cabeçalho
    worksheet.getRow(1).font = { bold: true };

    return workbook;
  }
  async salesBySaller(startDate, endDate) {
    return StockMovement.aggregate([
      {
        $match:{
          type: 'out',
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        },
        
      },
      {
        $group: {
          _id: '$user',
          totalItensSold: { $sum: '$quantity' },
          totalSalesValue:{
            $sum: { $multiply: ['$quantity', '$unitPrice']}
          }
        }
      },
      {
        $unwind: '$seller'
      },
      {
        $project: {
          _id: 0,
          seller: '$saller.name',
          email: '$saller.email',
          role: '$saller.role',
          totalItensSold: 1,
          totalSalesValue: 1
        }
      },
      {
        $sort: { totalSalesValue: -1 }
      },
    ]);
  }
}

module.exports = new ReportService();
