const express = require('express');
const SongHash = require('../modals/songHash');

const router = express.Router();

//POST
router.post('/', async(req,res) => {
    const songHash= new SongHash({
        songHash: req.body.songHash,
        songCount: req.body.songCount,
    });
    try{
        const savedSong = await songHash.save();
        res.json(savedSong);
    }catch(err){
        res.json({message: err})
    };
});

module.exports = router;