const mongoose = require('mongoose');

const schema = mongoose.Schema({
    songIdentifier: {
        type: String,
        required: true,
    },
    aesKey: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Song', schema);