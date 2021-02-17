const express = require('express');
const Song = require('../modals/songs');
const router = express.Router();

//UPDATE
router.patch('/', async(req,res) => {
    try {
        const post =  await Song.updateOne({songIdentifier: req.body.songIdentifier}, { $inc: {revenueFromTip : parseInt(req.body.tipAmount)}});
        console.log('POST',post);
        res.json(true);
    } catch (error) {
        console.log('ERRPR', error);
        res.json(false)
    }
    
});

module.exports = router;
