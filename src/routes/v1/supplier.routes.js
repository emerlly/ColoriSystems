const express = require('express');
const router = express.Router();

const SupplierController = require('../../controller/SupplierController');
const { auth, authorize } = require('../../middlewares/authMiddleware');

router.use(auth);

router.post('/', authorize(['admin', 'stockist']), SupplierController.createSupplier);
router.get('/', SupplierController.getAllSuppliers);

module.exports = router;
