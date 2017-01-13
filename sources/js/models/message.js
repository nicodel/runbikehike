/* globals Backbone */
/* exported Message */
'use strict';
var RBH = RBH || {};
RBH.Models = RBH.Models || {};

RBH.Models.Message = Backbone.Model.extend({
  idAttribute : '_id',
  defaults : {
    date : new Date()
  }
});
