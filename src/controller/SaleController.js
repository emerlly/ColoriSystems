const SaleService = require('../services/SaleService');

class SaleController {

  async createSale(req, res) {
    try {
      const sale = await SaleService.createSale(req.body, req.user._id);
      res.status(201).json(sale);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao registrar venda', error: error.message });
    }
  }

  async getAllSales(req, res) {
    try {
      const data = await SaleService.getAllSales();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar vendas', error: error.message });
    }
  }

  async getSaleById(req, res) {
    try {
      const data = await SaleService.getSaleById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

}

module.exports = new SaleController();
