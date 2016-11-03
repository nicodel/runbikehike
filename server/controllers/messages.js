/* jshint strict: true, node: true */
'use strict';

var Messages = require('../models/messages');

module.exports.getAll = function(req, res, next) {
  Messages.all(function(err, docs) {
    if (err !== null) {
      next(null);
    } else {
      res.send(docs);
    }
  });
};
module.exports.add = function(req, res, next) {
  console.log('Message to be added is', req.body);
  Messages.create(req.body, function (err, message) {
    if (err) {
      next(err);
    } else {
      res.status(200).send(message);
    }
  });
};
module.exports.getOne = function(req, res, next) {
  console.log('Message getting one', req.params.id);
  Messages.find(req.params.id, function(err, complete) {
  if (err !== null) {
      next(null);
    } else {
      // console.log('complete doc.data', complete.data);
      res.send(complete);
    }
  });
};
