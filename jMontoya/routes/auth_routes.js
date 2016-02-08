const express = require('express');
const User = require(__dirname + '/../models/user');
const parser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/db_error_handler');
const basicHTTP = require(__dirname + '/../lib/basic_http');

var authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', parser, (req, res) => {
  var newUser = new User();
  if (!((req.body.email || '').length && (req.body.password || '').length > 7)) {
    return res.status(400).json({msg: 'invalid user or password'});
  }

  newUser.username = req.body.username || req.body.email;
  newUser.authentication.email = req.body.email;
  newUser.hashPassword(req.body.password);
  newUser.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({token: data.generateToken()}); //to be replaced by an auth token
  });
});

authRouter.get('/signin', basicHTTP, (req, res) => {
  User.findOne({'authentication.email': req.basicHTTP.email}, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'auth says no email'});
    }

    if (!user) return res.status(401).json({msg: 'auth says no user'});

    if (!user.comparePassword(req.basicHTTP.password)) return res.status(401).json({msg: 'auth says wrong pw'});
  });
});
