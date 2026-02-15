const express = require('express');
const router = express.Router();

/**
 * @openapi
 * /users/{id}/reset-password:
 *   patch:
 *     summary: Redefine a senha do usuário
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "NovaSenha@123"
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso
 *       404:
 *         description: Usuário não encontrado
 */

router.use('/auth', require('./auth.routes'));
router.use('/products', require('./products.routes'));
router.use('/categories', require('./category.routes'));
router.use('/suppliers', require('./supplier.routes'));
router.use('/customers', require('./customer.routes'));
router.use('/stock', require('./stock.routes'));
router.use('/reports', require('./report.routes'));
router.use('/health', require('./health.routes'));
router.use('/users', require('./user.routes'));
router.use('/sales', require('./sale.routes'));
router.use('/quotes', require('./quote.routes'));
router.use('/orders', require('./order.routes'));
router.use('/dashboard', require('./dashboard.routes'));

module.exports = router;
