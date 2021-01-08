const express = require('express');
const Song = require('../modals/songs');
const router = express.Router();
const crypto = require('crypto-js');

//SEARCH AND RETURN
router.post('/', async(req,res) => {
    try {
        const post =  await Song.find({artistName : req.body.searchItem});
        console.log(post.length);
        if(post.length != 0 ){
            res.json(post.map(function(data){
                var decrypted = crypto.AES.decrypt(data.aesKey, process.env.key);
                var plaintext = decrypted.toString(crypto.enc.Utf8)
                return({
                   musicName: data.songName,
                   musicIdentifier: data.songIdentifier,
                   artistName: data.artistName,
                   musicCount: data.songCount,
                   AESKey: plaintext
                })
                }))
        }
        else{
            const post =  await Song.find({songName : req.body.searchItem});
            console.log(post);
            var decrypted = crypto.AES.decrypt(post[0].aesKey, process.env.key);
            var plaintext = decrypted.toString(crypto.enc.Utf8)
            res.json([{                   
                musicIdentifier: post[0].songIdentifier,
                musicName: post[0].songName,
                artistName: post[0].artistName,
                musicCount: post[0].songCount,
                AESKey: plaintext
            }])
        }
    } catch (error) {
        console.log(error);
        res.json(false); 
    }
    
});

module.exports = router;