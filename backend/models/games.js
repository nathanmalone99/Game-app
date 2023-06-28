const mongoose = require('mongoose');

const gameSchema  = mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    pgRating: { type: String, required: true}
});

module.exports = mongoose.model('Games', gameSchema);