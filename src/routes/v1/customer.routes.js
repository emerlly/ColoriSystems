const express = require('express');
const router = express.Router();

const CustomerController = require('../../controller/CustomerController');
const { auth, authorize } = require('../../middlewares/authMiddleware');

router.use(auth);

router.post('/', authorize(['admin', 'customer']), CustomerController.createCustomer);
router.get('/', CustomerController.getAllCustomers);

module.exports = router;