/* jshint strict: true, node: true */
'use strict';

var PouchDB     = require('pouchdb');
var rbhmessagesDB  = new PouchDB('rbh_messages');

module.exports.getAll = function(req, res) {
  rbhmessagesDB.allDocs({
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
  rbhmessagesDB.post(req.body, function(err, doc) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      res.status(201).send(doc);
    }
  });
};

module.exports.getOne = function(req, res) {
  rbhmessagesDB.get(req.params.id, function(err, doc) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      res.status(200).send(doc);
    }
  });
};

module.exports.update = function (req, res) {
  rbhmessagesDB.get(req.params.id, req.body, function (err, doc) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      rbhmessagesDB.put(req.body, function(err, response) {
        if (err) {
          res.status(err.status).send({error: err.message});
        }
        res.status(200).send(response);
      });
    }
  });
};

module.exports.remove = function(req, res) {
  rbhmessagesDB.get(req.params.id, function(err, doc) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      rbhmessagesDB.remove(doc._id, doc._rev, function(err, response) {
        if (err) {
          res.status(err.status).send({error: err.message});
        }
        res.status(200).send(response);
      });
    }
  });
};
