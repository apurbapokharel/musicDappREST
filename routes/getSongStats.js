const express = require('express');
const Song = require('../modals/songs');
const router = express.Router();
const crypto = require('crypto-js');

//SEARCH AND RETURN
router.post('/', async(req,res) => {
    try {
        const post =  await Song.find({songIdentifier : req.body.songIdentifier});
        console.log(post);
        
        var costPerStream = post[0].costPerStream
        var costPerDownload = post[0].costPerDownload
        var streamCount = post[0].streamCount
        var downloadCount = post[0].downloadCount
        var revenueFromTip = post[0].revenueFromTip
        res.json([costPerStream, costPerDownload, streamCount, downloadCount, revenueFromTip]);
    } catch (error) {
        console.log(error);
        res.json("not found"); 
    }
    
});

module.exports = router;