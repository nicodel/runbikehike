/* jshint strict: true, node: true */
'use strict';

var GPSTracks = require('../models/sessions');

module.exports.getAll = function(req, res, next) {
  GPSTracks.all(function(err, docs) {
    if (err !== null) {
      next(null);
    } else {
      res.send(docs);
    }
  });
};
module.exports.add = function(req, res, next) {
  // console.log('Session to be added is', req.body);
  GPSTracks.create(req.body, function (err, session) {
    if (err) {
      next(err);
    } else {
      res.status(201).send(session);
    }
  });
};
module.exports.getOne = function(req, res, next) {
  console.log('getting one', req.params.id);
  GPSTracks.find(req.params.id, function(err, complete) {
  if (err !== null) {
      next(null);
    } else {
      // console.log('complete doc.data', complete.data);
      res.send(complete);
    }
  });
};
module.exports.remove = function(req, res, next) {
    console.log('removing one', req.params.id);
    GPSTracks.destroy(req.params.id, function (err, complete) {
      if (err !== null) {
        next(null);
      } else {
        console.log('gps_tracks removed', complete);
        res.send(complete);
      }
    });
};
module.exports.update = function(req, res, next) {
    console.log('updating one', req.params.id);
};
