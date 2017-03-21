/* jshint strict: true, node: true */
'use strict';

var PouchDB     = require('pouchdb');
var gpstracksDB  = new PouchDB('gps_tracks');

module.exports.add = function(req, res) {
  gpstracksDB.post(req.body, function(err, doc) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      res.status(201).send(doc);
    }
  });
};

module.exports.getOne = function(req, res) {
  gpstracksDB.get(req.params.id, function(err, doc) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      res.status(200).send(doc);
    }
  });
};

module.exports.update = function (req, res) {
  gpstracksDB.get(req.params.id, req.body, function (err, doc) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      gpstracksDB.put(req.body, function(err, response) {
        if (err) {
          res.status(err.status).send({error: err.message});
        }
        res.status(200).send(response);
      });
    }
  });
};

module.exports.remove = function(req, res) {
  gpstracksDB.get(req.params.id, function(err, doc) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      gpstracksDB.remove(doc._id, doc._rev, function(err, response) {
        if (err) {
          res.status(err.status).send({error: err.message});
        }
        res.status(200).send(response);
      });
    }
  });
};
