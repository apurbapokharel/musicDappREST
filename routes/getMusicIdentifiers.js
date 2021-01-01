const express = require('express');
const Song = require('../modals/songs');
const router = express.Router();
const crypto = require('crypto-js');

router.get('/', async(req,res) => {
    try {
        const post =  await Song.find();
        
        res.json(post.map(function(data){
            var decrypted = crypto.AES.decrypt(data.aesKey, process.env.key);
            var plaintext = decrypted.toString(crypto.enc.Utf8)
            return({
               musicIdentifer: data.songIdentifier,
               musicName: data.songName,
               artistName: data.artistName,
               musicCount: data.songCount,
               AESKey: plaintext
            })
        }));
    } catch (error) {
        console.log(error);
        res.json("not found"); 
    }
    
});

module.exports = router;