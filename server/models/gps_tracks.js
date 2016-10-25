/* jshint strict: true, node: true */
'use strict';
var cozydb = require('cozydb');
var GPSTracks = cozydb.getModel('GpsTracks', {
  'creator' : String,
  'metadata'  : {
    'author'  : String,
    'time'    : Date
  },
  'trk' : {
    'name'  : String,
    'segs'  : Array
  }
});
GPSTracks.all = function(callback) {
  GPSTracks.request("all", {}, function(err, docs) {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  });
};
module.exports = GPSTracks;
