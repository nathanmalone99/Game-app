const express = require('express');
const gameSchema = require('../models/games');
const router = express.Router();

router.get('/games', async (req, res) => {
    try {
        const games = await gameSchema.find({});
        res.status(200).send(games);
    }
    catch(error) {
        res.status(500).send(error);
    }
})

module.exports = router;