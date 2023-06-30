const express = require('express');
const port = 3000;
const gameRouter = require('./routes/games');
require('./db/mongoose');

const app = express();

app.use(express.json());

app.use(gameRouter);

app.listen(port, () => {
  console.log('app is running on port 3000!')
});

//app.use('/games', appRoutes);

module.exports = app;


