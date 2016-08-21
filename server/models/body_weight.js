/* jshint strict: true, node: true */
'use strict';
var cozydb = require('cozydb');
var Body_weight = cozydb.getModel('Weight', {
    'date'    : Date,
    'weight'  : Number,
    'vendor'  : {type: String, default: 'RunBikeHike'}
});
Body_weight.all = function(callback) {
  Body_weight.request("all", {}, function(err, docs) {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  });
};
module.exports = Body_weight;
