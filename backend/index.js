const express = require('express');
const port = 3000;
const gameRouter = require('./routes/games');
const userRouter = require('./routes/user');
const checkoutRouter = require('./routes/checkout');
require('./db/mongoose');


const app = express();

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
app.use(checkoutRouter);




app.listen(port, () => {
  console.log('app is running on port 3000!')
});



module.exports = app;


