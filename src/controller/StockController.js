const StockService = require('../services/StockService');

const registerMovement = async (req, res) => {
  try {
    const result = await StockService.registerMovement(req.body, req.user._id);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getStockStatus = async (req, res) => {
  try {
    const data = await StockService.getStockStatus();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovementsHistory = async (req, res) => {
  try {
    const data = await StockService.getMovementsHistory(req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerMovement,
  getStockStatus,
  getMovementsHistory
};
