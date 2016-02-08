const express = require('express');
const parser = require('body-parser').json();
const Politician = require(__dirname + '/../models/republicanModel');
const handleDBError = require(__dirname + '/../lib/db_error_handler');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

var politicianRouter = module.exports = exports = express.Router();

politicianRouter.post('/repPoliticians', jwtAuth, parser, (req, res) => {
  var newPolitician = new Politician(req.body);
  newPolitician.politicianId = req.user._id;
  newPolitician.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
  console.log('POSTed!');
});

politicianRouter.get('/repPoliticians', (req, res) => {
  Politician.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
  console.log('GETted!');
});

politicianRouter.get('/myRepPoliticians', jwtAuth, (req, res) => {
  Politician.find({politicianId: req.user._id}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
  console.log('GETted with Auth!');
});

politicianRouter.get('/repPoliticians/:id', (req, res) => {
  Politician.find({_id: req.params.id}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
  console.log('GETted by ID!');
});

politicianRouter.put('/repPoliticians/:id', parser, (req, res) => {
  var republicanData = req.body;
  delete republicanData._id;
  Politician.update({_id: req.params.id}, republicanData, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'you have successfully updated the file'});
  });
  console.log('PUTted!');
});

politicianRouter.delete('/repPoliticians/:id', (req, res) => {
  Politician.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'you have successfully deleted the file'});
  });
  console.log('DELETEd!');
});
politicianRouter.get('/repPoliticians/info', function(req, res) {
  res.send('The Republican Party, commonly referred to as the GOP (abbreviation for Grand Old Party), is one of the two major contemporary political parties in the United States, the other being its historic rival, the Democratic Party.');
});
