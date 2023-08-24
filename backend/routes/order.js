const express = require('express');
const orderSchema = require('../models/order');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')




router.get('/api/orders/user/:userEmail', checkAuth, async (req, res) => {

    if (!req.userData) {
        return res.status(500).send({ message: 'User data not found.' });
    }

    try {
        // Ensure the requested user ID matches the authenticated user's ID
        if (req.params.userEmail !== req.userData.email) {
            return res.status(403).send({ message: 'Access Denied' });
        }
        const userEmail = req.params.userEmail;
        const orders = await orderSchema.find({ 'customer.email': req.userData.email });
        console.log(req.userData.email)
        console.log(req.params.userEmail)

        res.status(200).send(orders);
    }
    catch(error) {
        console.error("Error while fetching orders:", error.message);
        res.status(500).send(error);
    }
});

module.exports = router;
