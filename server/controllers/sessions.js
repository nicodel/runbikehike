/* jshint strict: true, node: true */
'use strict';

var Sessions = require('../models/sessions');

module.exports.getAll = function(req, res, next) {
  Sessions.all(function(err, docs) {
    if (err !== null) {
      next(null);
    } else {
      res.send(docs);
    }
  });
};
module.exports.add = function(req, res, next) {
  // console.log('Session to be added is', req.body);
  Sessions.create(req.body, function (err, session) {
    if (err) {
      next(err);
    } else {
      res.status(201).send(session);
    }
  });
};
module.exports.getOne = function(req, res, next) {
  //console.log('Session getting one', req.params.id);
  Sessions.find(req.params.id, function(err, complete) {
  if (err !== null) {
      next(null);
    } else {
      //console.log('complete doc', complete);
      res.send(complete);
    }
  });
};
module.exports.remove = function(req, res, next) {
  //console.log('Session removing one', req.params.id);
  Sessions.destroy(req.params.id, function (err, complete) {
    if (err !== null) {
      next(null);
    } else {
      //console.log('session removed', complete);
      res.send(complete);
    }
  });
};
module.exports.update = function(req, res, next) {
  //console.log('Session updating one', req.params.id);
  Sessions.find(req.params.id, function (err, session) {
    if (err) {
      next(null);
    }
    session.updateAttributes(req.body, function (err) {
      if (err) {
        next(null);
      } else {
        res.send(session);
      }
    });
  });
};
