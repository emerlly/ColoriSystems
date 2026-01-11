const express = require('express');
const router = express.Router();

const CategoryController = require('../../controller/CategoryController');
const { auth, authorize } = require('../../middlewares/authMiddleware');

router.use(auth);

router.post('/', authorize(['admin', 'stockist']), CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);

module.exports = router;