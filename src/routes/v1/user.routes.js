const express = require('express');
const router = express.Router();

const UserController = require('../../controller/userController');
const { auth, authorize } = require('../../middlewares/authMiddleware');

router.use(auth);

router.post('/register', authorize(['admin', 'customer']), UserController.createUser);
router.get('/', UserController.getAllUsers);

module.exports = router;