const express = require('express');
const router = express.Router();
const invoice = require('./invoice');
const payment = require('./payments')

// Initialising invoice and payment routes
router.use('/invoice',invoice)
router.use('/payment',payment)

module.exports = router;