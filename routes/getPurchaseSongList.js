const express = require('express');
const PurchaseSong = require('../modals/purchasedSongs');
const router = express.Router();

//SEARCH AND RETURN
router.get('/', async(req,res) => {
    try {
        const post =  await PurchaseSong.find({userPublicKey : req.body.userPublicKey});
        console.log(post);
        res.json(post[0].downloadedSongs);
    } catch (error) {
        console.log(error);
        res.json("not found"); 
    }
    
});

module.exports = router;