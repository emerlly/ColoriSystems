const express = require('express');
const router = express.Router();

const ProductController = require('../../controller/ProductController');
const { auth, authorize } = require('../../middlewares/authMiddleware');

router.use(auth);

router.post('/', authorize(['admin', 'stockist']), ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.put('/:id', authorize(['admin', 'stockist']), ProductController.updateProduct);
router.delete('/:id', authorize('admin'), ProductController.deleteProduct);

module.exports = router;