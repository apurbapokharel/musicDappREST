const express = require('express');
const PurchaseSong = require('../modals/purchasedSongs');
const router = express.Router();

//POST
router.post('/', async(req,res) => {
    //search for user 
    const post =  await PurchaseSong.find({userPublicKey: req.body.userPublicKey});
    if(post.length == 0){
        //user does not exist 
        const purchaseSong= new PurchaseSong({
            userPublicKey: req.body.userPublicKey,
        });
        try{
            purchaseSong.downloadedSongs.push(req.body.songIdentifier)
            const savedList = await purchaseSong.save();
            res.json(true);
        }catch(err){
            res.json({message: err})
        };
    }
    else{
        //user exists
        const post =  await PurchaseSong.updateOne({userPublicKey: req.body.userPublicKey}, { $push: {downloadedSongs: [req.body.songIdentifier]}});
        res.json(true);
    }
});

module.exports = router;