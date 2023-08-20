const express = require('express');
const orderSchema = require('../models/order');
const router = express.Router();

router.get('/api/orders', async (req, res) => {
    try {
        const orders = await orderSchema.find({});
        res.status(200).send(orders);
    }
    catch(error) {
        res.status(500).send(error);
    }
});

module.exports = router;
