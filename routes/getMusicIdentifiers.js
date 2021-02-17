const express = require('express');
const Song = require('../modals/songs');
const router = express.Router();
const crypto = require('crypto-js');

router.get('/', async(req,res) => {
    try {
        const post =  await Song.find();
        
        res.json(post.map(function(data){
            console.log(data);
            var decryptedAES = crypto.AES.decrypt(data.aesKey, process.env.key);
            var plaintextAES = decryptedAES.toString(crypto.enc.Utf8)

            var decryptedIV = crypto.AES.decrypt(data.iv, process.env.key);
            var plaintextIV = decryptedIV.toString(crypto.enc.Utf8)
            return({
               musicIdentifer: data.songIdentifier,
               musicName: data.songName,
               artistName: data.artistName,
               musicCount: data.songCount,
               AESKey: plaintextAES,
               iv: plaintextIV,
               costPerStream:  data.costPerStream,
               costPerDownload: data.costPerDownload
            })
        }));
    } catch (error) {
        console.log(error);
        res.json("not found"); 
    }
    
});

module.exports = router;