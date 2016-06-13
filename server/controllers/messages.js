/* jshint strict: true, node: true */
'use strict';

var Messages = require('../models/messages');

module.exports.getAll = function(req, res, next) {
  Messages.all(function(err, docs) {
    if (err !== null) {
      next(null);
    } else {
      var partial = [];
      if (docs.length !== 0) {
        for (var i = 0; i < docs.length; i++) {
          // console.log('data to be deleted is', docs[i].data);
          // delete docs[i].data;
          docs[i].data = [];
          partial.push(docs[i]);
        }
      }
      console.log('partial', partial);
      res.send(partial);
    }
  });
};
module.exports.add = function(req, res, next) {
  // console.log('data to be added is', req.body.data);
  Messages.add(req.body, function(err, doc) {
    if (err !== null) {
      res.status(500).send({error: 'An error occured - ' + err + doc});
      next(null);
    } else {
      res.send();
    }
  });
};
module.exports.getOne = function(req, res, next) {
  console.log('getting one', req.params.id);
  Messages.find(req.params.id, function(err, complete) {
  if (err !== null) {
      next(null);
    } else {
      // console.log('complete doc.data', complete.data);
      res.send(complete);
    }
  });
};
