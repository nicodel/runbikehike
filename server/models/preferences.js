/* jshint strict: true, node: true */
'use strict';
var cozydb = require('cozydb');
var Preferences = cozydb.getModel('preferences', {
  'language'  : String,
  'unit'      : String,
  'gender'    : String,
  'birthyear' : Number,
  'height'    : Number
});
Preferences.all = function(callback) {
  Preferences.request("all", {}, function(err, docs) {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  });
};
Preferences.update = function(data, callback) {
  Preferences.find(data.id, function(err, res) {
/*    console.log('res to be updated', res);
    console.log('data to update', data);*/
    res.updateAttributes(data, function(err, preferences) {
      if (err) {
        callback(err);
      } else {
        callback(null, preferences);
      }
    });
  });
};
module.exports = Preferences;
