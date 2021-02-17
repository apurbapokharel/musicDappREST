const express = require('express');
const Song = require('../modals/songs');
const router = express.Router();
const crypto = require('crypto-js');

//SEARCH AND RETURN
router.post('/', async(req,res) => {
    try {
        const post =  await Song.find({artistName : req.body.searchItem});
        console.log(post.length, post);
        if(post.length != 0 ){
            res.json(post.map(function(data){
                var decryptedAES = crypto.AES.decrypt(data.aesKey, process.env.key);
                var plaintextAES = decryptedAES.toString(crypto.enc.Utf8)
                var decryptedIV = crypto.AES.decrypt(data.iv, process.env.key);
                var plaintextIV = decryptedIV.toString(crypto.enc.Utf8)
                return({
                   musicName: data.songName, 
                   musicIdentifier: data.songIdentifier,
                   artistName: data.artistName,
                   musicCount: data.songCount,
                   AESKey: plaintextAES,
                   iv: plaintextIV,
                   costPerStream: data.costPerStream,
                   costPerDownload: data.costPerDownload
                })
                }))
        }
        else{
            const post =  await Song.find({songName : req.body.searchItem});
            console.log(post.length, post);
            var decryptedAES = crypto.AES.decrypt(post[0].aesKey, process.env.key);
            var plaintextAES = decryptedAES.toString(crypto.enc.Utf8)
            var decryptedIV = crypto.AES.decrypt(post[0].iv, process.env.key);
            var plaintextIV = decryptedIV.toString(crypto.enc.Utf8)
            res.json([{                   
                musicIdentifier: post[0].songIdentifier,
                musicName: post[0].songName,
                artistName: post[0].artistName,
                musicCount: post[0].songCount,
                AESKey: plaintextAES,
                iv: plaintextIV,
                costPerStream: post[0].costPerStream,
                costPerDownload: post[0].costPerDownload,
                streamCount: post[0].streamCount,
                downloadCount: post[0].downloadCount,
                revenueFromTip: post[0].revenueFromTip
            }])
        }
    } catch (error) {
        console.log(error);
        res.json(false); 
    }
    
});

module.exports = router;