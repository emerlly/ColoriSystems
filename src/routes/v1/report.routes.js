const express = require('express');
const router = express.Router();

const ReportController = require('../../controller/ReportController');
const { auth, authorize } = require('../../middlewares/authMiddleware');

router.use(auth);

router.get('/sales', authorize(['admin', 'manager']), ReportController.getSalesReport);
router.get('/low-stock', authorize(['admin', 'manager', 'stockist']), ReportController.getLowStockReport);
router.get('/export-excel', authorize(['admin', 'manager']), ReportController.exportToExcel);
router.get('/salles-by-seller', authorize(['admin', 'manager']), ReportController.salesBySeller);


module.exports = router;
