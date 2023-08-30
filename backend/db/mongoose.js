const mongoose = require('mongoose');


//mongodb+srv://nathanmalone99:test1234@cluster0.nxh5bqi.mongodb.net/?retryWrites=true&w=majority

 mongoose.connect('mongodb://127.0.0.1:27017/osd', {
    useNewUrlParser: true,
    useUnifiedTopology: true
 }).then(() => {
    console.log('Connected to database');
 }).catch(error => {
    console.log('Unable to connect to database', error);
 })
   