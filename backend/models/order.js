const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    city: String, 
    country: String, 
    line1: String, 
    line2: String, 
    postal_code: String, 
    state: String, 
});


const CustomerSchema = new Schema({
    address: AddressSchema,
    email: String,
    name: String,
    phone: { type: String, default: null},
    tax_exempt: { type: String, enum: ['none', 'exempt', 'reverse'], default: 'none'},
    tax_ids: [String] 
});

const OrderSchema = new Schema({
    orderId: String,
    customer: CustomerSchema,
    total: Number,
    currency: { type: String, enum: ['eur', 'usd', 'gbp'],default: 'eur'}
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;