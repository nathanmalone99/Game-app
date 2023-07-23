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

router.post("/api/games/post", (req, res, next) => {
    const game = new gameSchema({
      title: req.body.title,
      description: req.body.description,
      pgRating: req.body.pgRating,
      price: req.body.price
    });
    game.save().then(createdPost => {
      res.status(201).json({
        message: 'Post Added successfully',
        postId: createdPost._id
      });
    });
});

router.put("/api/games/edit/:id", (req, res, next) => {
    const game = new gameSchema({
      _id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      pgRating: req.body.pgRating,
      price: req.body.price
    })
    gameSchema.updateOne({_id: req.params.id}, game).then(result => {
        console.log(result);
      res.status(200).json({message: 'Update Successful'});
    });
});

router.delete("/api/games/delete/:id", (req, res, next) => {
    gameSchema.deleteOne({_id: req.params.id}).then(result => {
      console.log(result);
      res.status(200).json({message: 'Post Deleted'})
    });
});

  



module.exports = router;