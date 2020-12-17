const express = require('express');
const Song = require('../modals/songs');
const router = express.Router();
const crypto = require('crypto-js');

//SEARCH AND RETURN
router.get('/', async(req,res) => {
    try {
        console.log(req.body.songIdentifier);
        const post =  await Song.find({songIdentifier : req.body.songIdentifier});
        var decrypted = crypto.AES.decrypt(post[0].aesKey, process.env.key);
        var plaintext = decrypted.toString(crypto.enc.Utf8)
        res.json(plaintext);
    } catch (error) {
        console.log(error);
        res.json("not found"); 
    }
    
});

module.exports = router;