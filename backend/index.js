const express = require('express');

const stripe = require('stripe')('sk_test_51N7gd7IB2R5TmgiioGQN6rwHxBFW4P22XgvmE5X9ilmmulnfMAoXZDUpuXuvEZKCWswMCfo85pL2qLEEsSBt1o0m00wyolSf7M');

const port = 3000;
const gameRouter = require('./routes/games');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const cors = require('cors');
const path = require('path');

const bodyParser = require('body-parser');
const { db } = require('./models/users');

require('./db/mongoose');



const app = express();





app.use(bodyParser.json());
app.use(cors());

app.use(express.json());






app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Method', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.header('AllowAnyMethod');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.use(gameRouter);
app.use(userRouter);
app.use(orderRouter);


app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

app.get('/api/cancel', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cancel.html'));
});


app.post('/api/checkout', async (req, res) => {
  try {

    const cart = req.body;
    

    if (!cart.items || !Array.isArray(cart.items)) {
      return res.status(400).send('Items not provided or not in correct format');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['IE', 'US'],
        },
            shipping_options: [
            {
                shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                    amount: 0,
                    currency: 'eur',
                },
                display_name: 'Free shipping',
                delivery_estimate: {
                    minimum: {
                    unit: 'business_day',
                    value: 5,
                    },
                    maximum: {
                    unit: 'business_day',
                    value: 7,
                    },
                }
                }
            },
            {
                shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                    amount: 1500,
                    currency: 'eur',
                },
                display_name: 'Next day air',
                
                delivery_estimate: {
                    minimum: {
                    unit: 'business_day',
                    value: 1,
                    },
                    maximum: {
                    unit: 'business_day',
                    value: 1,
                    },
                }
                }
            },
            ],
      line_items: cart.items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.title,
            
          },
          unit_amount: item.price * 100, 
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${'http://localhost:3000'}/api/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${'http://localhost:4200'}/cancel`,

    
    });
    console.log("Created session:", session);

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error.message);
    res.status(500).send('Error creating Stripe session');
  }
});

app.get('/api/payment-success', async (req, res,) => {
  try {
    const sessionId = req.query.session_id;
    
    if (sessionId) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      console.log("Retrieved session:", session);

    
      const customerDetails = session.customer_details;

      if (session.payment_status === 'paid') {
        const order = {
          orderId: sessionId,
          customer: customerDetails,
          total: session.amount_total / 100,
          currency: session.currency,
        };
        await db.collection('orders').insertOne(order);
      }
    }
    res.redirect('http://localhost:4200/success');
  } catch (error) {
    console.error("Error in /api/payment-success:", error);
    res.status(500).send('Internal Server Error');
  }
});

const DIST_FOLDER = path.join(__dirname, './dist/game-app');
app.use(express.static(DIST_FOLDER));


app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, 'index.html'));
});

app.listen(port, () => {
  console.log('app is running on port 3000!')
});



module.exports = app;


