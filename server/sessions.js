/* jshint strict: true, node: true */
'use strict';

var PouchDB     = require('pouchdb');
var sessionsDB  = new PouchDB('sessions');

module.exports.getAll = function(req, res) {
  sessionsDB.allDocs({
    include_docs: true,
    // attachments: true
  }, function(err, docs) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      // console.log('docs.rows', docs.rows);
      var ses = docs.rows.map(function (item) {
        return item.doc;
      });
      // console.log('ses', ses);
      res.status(200).send(ses);
    }
  });
};

module.exports.add = function(req, res) {
  sessionsDB.post(req.body, function(err, doc) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      res.status(201).send(doc);
      // console.log('doc added', doc);
    }
  });
};

module.exports.getOne = function(req, res) {
  sessionsDB.get(req.params.id, function(err, doc) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      res.status(200).send(doc);
    }
  });
};

module.exports.update = function (req, res) {
  sessionsDB.get(req.params.id, req.body, function (err, doc) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      sessionsDB.put(req.body, function(err, response) {
        if (err) {
          res.status(err.status).send({error: err.message});
        }
        res.status(200).send(response);
      });
    }
  });
};

module.exports.remove = function(req, res) {
  sessionsDB.get(req.params.id, function(err, doc) {
    if (err) {
      res.status(err.status).send({error: err.message});
    } else {
      sessionsDB.remove(doc._id, doc._rev, function(err, response) {
        if (err) {
          res.status(err.status).send({error: err.message});
        }
        res.status(200).send(response);
      });
    }
  });
};
