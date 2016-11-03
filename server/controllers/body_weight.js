/* jshint strict: true, node: true */
'use strict';

var BodyWeights = require('../models/body_weight');

module.exports.getAll = function(req, res, next) {
  BodyWeights.all(function(err, docs) {
    if (err !== null) {
      next(null);
    } else {
      res.send(docs);
    }
  });
};
module.exports.getAll = function(req, res, next) {
  BodyWeights.all(function(err, docs) {
    if (err !== null) {
      next(null);
    } else {
      res.send(docs);
    }
  });
};
module.exports.add = function(req, res, next) {
  console.log('BodyWeight to be added is', req.body);
  BodyWeights.create(req.body, function (err, doc) {
    if (err) {
      next(err);
    } else {
      res.status(200).send(doc);
    }
  });
};
module.exports.getOne = function(req, res, next) {
  console.log('BodyWeight getting one', req.params.id);
  BodyWeights.find(req.params.id, function(err, complete) {
  if (err !== null) {
      next(null);
    } else {
      // console.log('complete doc.data', complete.data);
      res.send(complete);
    }
  });
};
module.exports.remove = function(req, res, next) {
  console.log('BodyWeight removing one', req.params.id);
};
module.exports.update = function(req, res, next) {
  console.log('BodyWeight updating one', req.params.id);
};
