const express = require('express');
const Song = require('../modals/songs');
const router = express.Router();

router.get('/', async(req,res) => {
    try {
        const post =  await Song.find();
        
        res.json(post.map(function(data){
            return({
               musicIdentifer: data.songIdentifier,
               AESKey: data.aesKey
            })
        }));
    } catch (error) {
        console.log(error);
        res.json("not found"); 
    }
    
});

module.exports = router;