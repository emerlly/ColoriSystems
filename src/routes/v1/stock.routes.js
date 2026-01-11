const express = require('express');
const router = express.Router();

const StockController = require('../../controller/StockController');
const { auth, authorize } = require('../../middlewares/authMiddleware');


router.use(auth);

router.post(
  '/movement',
  authorize(['admin', 'stockist', 'operator']),
  StockController.registerMovement
);

router.get(
  '/status',
  authorize(['admin', 'stockist', 'manager']),
  StockController.getStockStatus
);

router.get(
  '/history',
  authorize(['admin', 'manager', 'stockist']),
  StockController.getMovementsHistory
);

module.exports = router;
