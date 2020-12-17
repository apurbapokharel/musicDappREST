const e = require('express');
const express = require('express');
const SongHash = require('../modals/songHash');
const router = express.Router();

//SEARCH AND RETURN
router.post('/', async(req,res) => {
    try {
        console.log(req.body);
        const post =  await SongHash.find({songHash: req.body.songHash});
        console.log(post, post.length);
        if(post.length == 0)
            //song does not exist
            res.json(false);
        else
            //song exist
            res.json(true);
    } catch (error) {
        // res.json({message: false});
        res.json(true); 
    }
    
});

module.exports = router;