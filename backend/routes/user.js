const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/users')


const userSchema = require("../models/users");

const router = express.Router();

const checkAuth = require('../middleware/check-auth')

router.get('/api/admin/users', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = User.find();
  let fetchedUsers;
  if (pageSize && currentPage) {
    postQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  postQuery
  .then(documents => {
    fetchedUsers = documents;
    return User.count();
  })
  .then(count => {
    res.status(200).json({
      message: "Users fetched successfully",
      users: fetchedUsers,
      maxPosts: count
    });
  });
});


router.get('/api/admin/users/:id', (req, res, next) => {
  userSchema.findById(req.params.id).then(user => {
      if(user) {
          res.status(200).json(user);
      } 
      else {
          res.status(404).json({message: 'User not found'});
      }
  });
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

router.post("/api/admin/users/post", (req, res, next) => {
  const user = new userSchema({
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  user.save().then(createdPost => {
    res.status(201).json({
      message: 'Post Added successfully',
      postId: createdPost._id
    });
  });
});

router.put("/api/admin/users/edit/:id", (req, res, next) => {
  const user = new userSchema({
    _id: req.body.id,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  })
  userSchema.updateOne({_id: req.params.id}, user).then(result => {
      console.log(result);
    res.status(200).json({message: 'Update Successful'});
  });
});

router.delete("/api/admin/users/delete/:id",(req, res, next) => {
  userSchema.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'User Deleted'})
  });
});

module.exports = router;


