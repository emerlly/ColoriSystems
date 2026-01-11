const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/products', require('./products.routes'));
router.use('/categories', require('./category.routes'));
router.use('/suppliers', require('./supplier.routes'));
router.use('/customers', require('./customer.routes'));
router.use('/stock', require('./stock.routes'));
router.use('/reports', require('./report.routes'));
//router.use('/sales', require('./report.routes')); //reundante
router.use('/health', require('./health.routes'));
router.use('/users', require('./user.routes'));

module.exports = router;
