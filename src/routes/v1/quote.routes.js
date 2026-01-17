const express = require('express');
const router = express.Router();

const QuoteController = require('../controller/QuoteController');
const { auth, authorize } = require('../middlewares/authMiddleware');

router.use(auth);

router.post('/', authorize(['admin', 'operator', 'stockist']), QuoteController.createQuote);
router.get('/', authorize(['admin', 'manager']), QuoteController.getAllQuotes);
router.put('/:id/approve', authorize(['admin', 'manager']), QuoteController.approveQuote);
router.put('/:id/cancel', authorize(['admin', 'manager']), QuoteController.cancelQuote);
router.put('/:id/convert', authorize(['admin', 'operator', 'stockist', 'customer']), QuoteController.convertQuote);

module.exports = router;
