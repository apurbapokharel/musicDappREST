const mongoose = require('mongoose');

const schema = mongoose.Schema({
    songHash: {
        type: String,
        required: true,
    },
    songCount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('SongHash', schema);