const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: { type: String },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        required: true,
        trim: true,
    },
    variety: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Product', productSchema); /*commit*/
