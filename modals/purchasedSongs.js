const mongoose = require('mongoose');

const schema = mongoose.Schema({
    userPublicKey: {
        type: String,
        required: true,
    },
    downloadedSongs: [{
        type: String,
        required: true,
    }]
});

module.exports = mongoose.model('PurchasedSongs', schema);