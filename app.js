const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config')
const mongoose = require('mongoose');
const postSong = require('./routes/postSong');
const postSongHash = require('./routes/postSongHash');
const getAESKey = require('./routes/getSongKey');
const getSongHash = require('./routes/compareSongHash');
const getSongsCount = require('./routes/getSongsCount.js');
const getMusicIdentifiers = require('./routes/getMusicIdentifiers');
const purchaseSong = require('./routes/purchaseSong');
const purchaseSongList = require('./routes/getPurchaseSongList');
const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/uploadSong', postSong);
app.use('/uploadSongHash', postSongHash);
app.use('/compareSongHash', getSongHash);
app.use('/getSongsCount', getSongsCount);
app.use('/getMusicIdentifiers', getMusicIdentifiers);
app.use('/getSongKey', getAESKey);
app.use('/purchaseSong', purchaseSong);
app.use('/getPurchasedSongList', purchaseSongList);

//routes
app.get('/', (req,res) => {
    res.send('We are on home');
});

//CONNECT DB
try {
    mongoose.connect(
        process.env.connectionURL2,
        { useNewUrlParser: true, useUnifiedTopology: true }, 
    );
} catch (error) {
    console.log("connection erroe", e);
}


//LISTEN
app.listen(3000);