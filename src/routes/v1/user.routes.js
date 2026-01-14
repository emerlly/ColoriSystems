const express = require('express');
const router = express.Router();

const UserController = require('../../controller/userController');
const { auth, authorize } = require('../../middlewares/authMiddleware');

router.use(auth);

router.post('/register', authorize(['admin', 'customer']), UserController.createUser);
router.get('/', UserController.getAllUsers);
router.put('/:id/reset-password', authorize(['admin', 'customer', 'manager', 'stockist']), UserController.resetPassword);
router.put('/:id/change-name', authorize(['admin', 'customer', 'manager', 'stockist']), UserController.changeName);

module.exports = router;