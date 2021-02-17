const express = require('express');
const PurchaseSong = require('../modals/purchasedSongs');
const Song = require('../modals/songs');
const router = express.Router();
const crypto = require('crypto-js');
//POST
router.post('/', async(req,res) => {
    //search for user 
    const post =  await PurchaseSong.find({userPublicKey: req.body.userPublicKey});

    //get song stats from songIdentifier
    const identifierSearchResult =  await Song.find({songIdentifier : req.body.songIdentifier});
    var decryptedAES = crypto.AES.decrypt(identifierSearchResult[0].aesKey, process.env.key);
    var plaintextAES = decryptedAES.toString(crypto.enc.Utf8)
    var decryptedIV = crypto.AES.decrypt(identifierSearchResult[0].iv, process.env.key);
    var plaintextIV = decryptedIV.toString(crypto.enc.Utf8)
    var song = {
        songIdentifier: identifierSearchResult[0].songIdentifier,
        songName: identifierSearchResult[0].songName,
        artistName: identifierSearchResult[0].artistName,
        songCount: identifierSearchResult[0].songCount,
        aesKey: plaintextAES,
        iv: plaintextIV,
        costPerStream: identifierSearchResult[0].costPerStream,
        costPerDownload: identifierSearchResult[0].costPerDownload

    }

    if(post.length == 0){
        //user does not exist 
        const purchaseSong= new PurchaseSong({
            userPublicKey: req.body.userPublicKey,
        });
        try{
            purchaseSong.downloadedSongs.push(song)
            const savedList = await purchaseSong.save();
            res.json(true);
        }catch(err){
            res.json({message: err})
        };
    }
    else{
        //user exists
        const post =  await PurchaseSong.updateOne({userPublicKey: req.body.userPublicKey}, { $push: {downloadedSongs: [song]}});
        console.log(post);
        res.json(true);
    }
});

module.exports = router;