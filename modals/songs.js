const mongoose = require('mongoose');

const schema = mongoose.Schema({
    songIdentifier: {
        type: String,
        required: true,
    },
    songName: {
        type: String,
        required: true,
    },
    artistName: {
        type: String,
        required: true,
    },
    songCount: {
        type: Number,
        required: true,
    },
    aesKey: {
        type: String,
        required: true,
    },
    iv: {
        type: String,
        required: true,
    },
    streamCount: {
        type: Number,
        default: 0,
    },
    downloadCount: {
        type: Number,
        default: 0,
    },
    costPerStream: {
        type: Number,
        required: true,
    },
    costPerDownload: {
        type: Number,
        required: true,
    },
    revenueFromTip: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Song', schema);