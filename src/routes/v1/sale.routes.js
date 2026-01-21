const express = require('express');
const router = express.Router();

const SaleController = require('../../controller/SaleController');
const { auth, authorize } = require('../../middlewares/authMiddleware');

router.use(auth);

router.post('/', authorize(['admin', 'operator', 'stockist', 'customer']), SaleController.createSale);
router.get('/', authorize(['admin', 'manager']), SaleController.getAllSales);
router.get('/:id', authorize(['admin', 'manager']), SaleController.getSaleById);

module.exports = router;
