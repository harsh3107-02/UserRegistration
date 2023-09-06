// models/address.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    address: String,
});

module.exports = mongoose.model('Address', addressSchema);