const express = require('express');
const Song = require('../modals/songs');
const router = express.Router();

//UPDATE
router.patch('/', async(req,res) => {
    try {
        const post =  await Song.updateOne({songIdentifier: req.body.songIdentifier}, { $inc: {downloadCount : 1}});
        res.json(true);
    } catch (error) {
        res.json(false)
    }
    
});

module.exports = router;
