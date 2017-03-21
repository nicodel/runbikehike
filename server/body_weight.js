/* jshint strict: true, node: true */
'use strict';

var PouchDB     = require('pouchdb');
var bodyweightDB  = new PouchDB('body_weight');

module.exports.getAll = function(req, res) {
  bodyweightDB.allDocs({
    include_docs: true,
    attachments:true
  }, function(err, docs) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      res.status(200).send(docs);
    }
  });
};

module.exports.add = function(req, res) {
  bodyweightDB.post(req.body, function(err, doc) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      res.status(201).send(doc);
    }
  });
};

module.exports.getOne = function(req, res) {
  bodyweightDB.get(req.params.id, function(err, doc) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      res.status(200).send(doc);
    }
  });
};

module.exports.update = function (req, res) {
  bodyweightDB.get(req.params.id, req.body, function (err, doc) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      bodyweightDB.put(req.body, function(err, response) {
        if (err) {
          res.status(err.status).send({error: err.message});
        }
        res.status(200).send(response);
      });
    }
  });
};

module.exports.remove = function(req, res) {
  bodyweightDB.get(req.params.id, function(err, doc) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      bodyweightDB.remove(doc._id, doc._rev, function(err, response) {
        if (err) {
          res.status(err.status).send({error: err.message});
        }
        res.status(200).send(response);
      });
    }
  });
};
