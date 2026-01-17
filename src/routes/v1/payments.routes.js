
const express = require('express');
const router = express.Router();
const {auth, authorize} = require('../../middleware/authMiddleware');
const { CreatePixSale } = require('../../controller/PaymentController');

router.use(auth);

// Rota para criar venda com pagamento via Pix
router.post('/pix-sale', auth, authorize(['admin', 'operator', 'seller', 'customer']), CreatePixSale);