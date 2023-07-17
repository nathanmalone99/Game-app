const express = require('express');
const gameSchema = require('../models/games');
const router = express.Router();

router.get('/api/games', async (req, res) => {
    try {
        const games = await gameSchema.find({});
        res.status(200).send(games);
    }
    catch(error) {
        res.status(500).send(error);
    }
});

router.get('/api/games/:id', (req, res, next) => {
    gameSchema.findById(req.params.id).then(game => {
        if(game) {
            res.status(200).json(game);
        } 
        else {
            res.status(404).json({message: 'Game not found'});
        }
    });
});



module.exports = router;