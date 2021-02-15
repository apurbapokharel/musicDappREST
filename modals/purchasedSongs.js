const mongoose = require('mongoose');

const schema = mongoose.Schema({
    userPublicKey: {
        type: String,
        required: true,
    },
    downloadedSongs: [
        {
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
            costPerStream: {
                type: Number,
                required: true,
            },
        }
    ]
});

module.exports = mongoose.model('PurchasedSongs', schema);