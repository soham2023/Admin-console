const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    file_url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Store', storeSchema);
