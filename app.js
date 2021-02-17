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
const searchSong = require('./routes/searchSong');
const encrypt = require('./routes/encrypt');
const updateStreamCount = require('./routes/updateStreamCount');
const updateDownloadCount = require('./routes/updateDownloadCount');
const songStats = require('./routes/getSongStats');
const tipArtist = require('./routes/tipArtist');
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
app.use('/searchSong', searchSong);
app.use('/encrypt', encrypt);
app.use('/updateStreamCount', updateStreamCount);
app.use('/updateDownloadCount', updateDownloadCount);
app.use('/getSongStats', songStats);
app.use('/tipArtist', tipArtist);
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