const orderService = require("../services/orderService");

class OrderController {
  async create(req, res) {
  
    try {
      const order = await orderService.create({
        ...req.body,
        companyId: req.companyId,
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    console.log('req.companyId', req.companyId);
    try {
      const orders = await orderService.getAll(req.companyId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const order = await orderService.getById(req.params.id);
      res.json(order);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const order = await orderService.updateStatus(
        req.params.id,
        req.body.situacao
      );
      res.json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new OrderController();
