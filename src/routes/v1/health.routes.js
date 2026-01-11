const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'UP',
    service: 'Inventory API',
    uptime: process.uptime()
  });
});

module.exports = router;
