const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    items: [{productId: mongoose.Schema.Types.ObjectId, title: String, price: Number, quantity: Number}],
    totalAmount: {type: Number, required: true},
    dateOrdered: {type: Date, default: Date.now}
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;