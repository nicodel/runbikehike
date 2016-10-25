/* jshint strict: true, node: true */
'use strict';
var cozydb = require('cozydb');
var Sessions = cozydb.getModel('sessions', {
  'date'          : Date,
  'time_interval' : Object,
  'activity_name' : String,
  'gps_track'     : Object,
  'altitude'      : Object,
  'calories'      : Number,
  'distance'      : Number,
  'speed'         : Number
});
Sessions.all = function(callback) {
  Sessions.request("all", {}, function(err, docs) {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  });
};
module.exports = Sessions;
