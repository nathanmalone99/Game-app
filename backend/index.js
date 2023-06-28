const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const appRoutes = require('./routes/crud');

mongoose.connect('mongodb://localhost:27017/osd')
  .then(() => {
    console.log('Connected to Database')
  })
  .catch(() => {
    console.log('Connection Failed')
  });

app.get('/', (req, res) => res.send('Hello World from Nathan!'));


app.listen(port, function check(error)
{
  if(error)
    {
      console.log("Connection failed")
    }
    else
    {
      console.log("Connected to database")
    }
});

app.use('/games', appRoutes);

module.exports = app;


