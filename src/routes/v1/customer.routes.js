const express = require('express');
const router = express.Router();

const CustomerController = require('../../controller/CustomerController');
const { auth, authorize } = require('../../middlewares/authMiddleware');

router.use(auth);

router.post('/', authorize(['admin', 'customer']), CustomerController.createCustomer);
router.get('/', CustomerController.getAllCustomers);
router.patch('/reset-password/:id', authorize(['admin', 'customer']), CustomerController.resetPassword);
router.patch('/reset-name/:id', authorize(['admin', 'customer']), CustomerController.resetName);
router.patch('/deactivate/:id', authorize(['admin']), CustomerController.deactivateCustomer);


module.exports = router;