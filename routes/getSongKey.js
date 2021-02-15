const express = require('express');
const Song = require('../modals/songs');
const router = express.Router();
const crypto = require('crypto-js');

//SEARCH AND RETURN
router.post('/', async(req,res) => {
    try {
        console.log(req.body.songIdentifier);
        const post =  await Song.find({songIdentifier : req.body.songIdentifier});
        console.log(post);
        var decryptedAES = crypto.AES.decrypt(post[0].aesKey, process.env.key);
        var AESKey = decryptedAES.toString(crypto.enc.Utf8)
        var decryptedIV = crypto.AES.decrypt(post[0].iv, process.env.key);
        var iv = decryptedIV.toString(crypto.enc.Utf8)
        var musicCount = post[0].songCount
        var costPerStream = post[0].costPerStream
        res.json([AESKey, musicCount, iv, costPerStream]);
    } catch (error) {
        console.log(error);
        res.json("not found"); 
    }
    
});

module.exports = router;