/* jshint strict: true, node: true */
'use strict';
var cozydb = require('cozydb');
var Bodies = cozydb.getModel('bodies', {
  'id'        : String,
  'type'      : String,
  'activity'  : String,
  'date'      : String,
  'value'     : String,
});
Bodies.all = function(callback) {
  Bodies.request("all", {}, function(err, docs) {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  });
};
module.exports = Bodies;
