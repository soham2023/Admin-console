const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    verity: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: String, // Assuming color is a string value
        required: true,
    },
}, { timestamps: true });

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
