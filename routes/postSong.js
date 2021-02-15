const express = require('express');
const Song = require('../modals/songs');
const crypto = require('crypto-js');

const router = express.Router();

//POST
router.post('/', async(req,res) => {
    //encrypt the aes hash
    hashedAES =  crypto.AES.encrypt(req.body.aesKey, process.env.key)
    hashedIV = crypto.AES.encrypt(req.body.iv, process.env.key)
    const song= new Song({
        songIdentifier: req.body.songIdentifier,
        songName: req.body.songName,
        artistName: req.body.artistName,
        songCount: req.body.songCount,
        aesKey: hashedAES,
        iv: hashedIV,
        costPerStream:  req.body.costPerStream
    });
    try{
        const savedSong = await song.save();
        res.json(savedSong);
    }catch(err){
        res.json({message: err})
    };
});

module.exports = router;