const express = require('express');
const Song = require('../modals/songs');
const router = express.Router();
const crypto = require('crypto-js');
 
//can delete this not used.
router.get('/', async(req,res) => {
    try {
        Song.countDocuments({}, function( err, count){
            res.json(count);
        })
    } catch (error) {
        console.log(error);
        res.json(false); 
    }
    
});

module.exports = router;