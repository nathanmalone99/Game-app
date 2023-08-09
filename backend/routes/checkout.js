 // This is your test secret API key.
const stripe = require('stripe')('sk_test_51N7gd7IB2R5TmgiioGQN6rwHxBFW4P22XgvmE5X9ilmmulnfMAoXZDUpuXuvEZKCWswMCfo85pL2qLEEsSBt1o0m00wyolSf7M');
const express = require('express');
const router = express.Router();


router.post('/api/checkout', async (req, res, next) => {
  
    const session = await stripe.checkout.sessions.create({
      line_items:  req.body.items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
       mode: 'payment',
       success_url: "http://localhost:3000/success.html",
       cancel_url: "http://localhost:3000/cancel.html",
    });

    res.redirect(303, session.url);
  
});


module.exports = router;

 