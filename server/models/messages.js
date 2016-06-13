/* jshint strict: true, node: true */
'use strict';
var cozydb = require('cozydb');
var Messages = cozydb.getModel('messages', {
  'id'        : String,
  'name'      : String,
  'duration'  : String,
  'distance'  : String,
  'date'      : String,
  'avg_speed' : String,
  'calories'  : String,
  'alt_max'   : String,
  'alt_min'   : String,
  'climb_pos' : String,
  'climb_neg' : String,
  'map'       : Boolean,
  'activity'  : String,
  'type'      : String,
  'text'      : String,
  'family'    : String,
  'data'      : cozydb.NoSchema,
  'value'     : String
});
Messages.all = function(callback) {
  Messages.request("all", {}, function(err, docs) {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  });
};
Messages.add = function(data, callback) {
  console.log('data to add through model is', data);
  Messages.create(data, function(err, res) {
    if (err) {
      callback(err);
    } else {
      console.log('messages after add are', res);
      callback(null, res);
    }
  });
};
module.exports = Messages;
