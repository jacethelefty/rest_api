const express = require('express');
const parser = require('body-parser').json();
const Politician = require(__dirname + '/../models/democraticModel');
const handleDBError = require(__dirname + '/../lib/db_error_handler');

var politicianRouter = module.exports = exports = express.Router();

politicianRouter.post('/demPoliticians', parser, (req, res) => {
  var newPolitician = new Politician(req.body);
  newPolitician.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
  console.log('POSTed!');
});

politicianRouter.get('/demPoliticians', (req, res) => {
  Politician.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
  console.log('GETted!');
});

politicianRouter.get('/demPoliticians/:id', (req, res) => {
  Politician.find({_id: req.params.id}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
  console.log('GETted by ID!');
});

politicianRouter.put('/demPoliticians/:id', parser, (req, res) => {
  var democratData = req.body;
  delete democratData._id;
  Politician.update({_id: req.params.id}, democratData, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'you have successfully updated the file'});
  });
  console.log('PUTted!');
});

politicianRouter.delete('/demPoliticians/:id', (req, res) => {
  Politician.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({msg: 'you have successfully deleted the file'});
  });
  console.log('DELETEd!');
});

politicianRouter.get('/demPoliticians/info', function(req, res) {
  res.send('Since 1848, the Democratic National Committee has been the home of the Democratic Party, the oldest continuing party in the United States.');
});
