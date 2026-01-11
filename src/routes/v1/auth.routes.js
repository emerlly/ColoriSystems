const express = require('express');
const router = express.Router();

const { login, register } = require('../../controller/AuthController');
const { auth, authorize } = require('../../middlewares/authMiddleware');

router.post('/login', login);
router.post('/register', auth, authorize('admin'), register);

module.exports = router;