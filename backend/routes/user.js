const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const userSchema = require("../models/users");

const router = express.Router();

const checkAuth = require('../middleware/check-auth')

router.get('/api/users', async (req, res) => {
  try {
      const user = await userSchema.find({});
      res.status(200).send(user);
  }
  catch(error) {
      res.status(500).send(error);
  }
});

router.post("/api/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new userSchema({
      email: req.body.email,
      password: hash,
      isAdmin: req.body.isAdmin || false
    });
    user.save()
      .then(result => {
        res.status(201).json({
          message: 'User creaated',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/api/login", (req, res, next) => {
  let fetchedUser;
  userSchema.findOne({ email: req.body.email })
  .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},
      "secret_this_should_be_longer",
      { expiresIn: "1h"}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      isAdmin: fetchedUser.isAdmin
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: "Auth failed"
    });
  });
});

router.delete("/api/users/delete/:id", checkAuth, checkAuth.checkAdmin,(req, res, next) => {
  userSchema.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'User Deleted'})
  });
});

module.exports = router;


