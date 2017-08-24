/* globals Backbone */
'use strict';
var RBH = RBH || {};
RBH.Models = RBH.Models || {};

RBH.Models.Session = Backbone.Model.extend({
  idAttribute: '_id',
/*  initialize: function () {
    this.listenTo(this, 'all', function(ev, res) {console.log('SESSION Model', ev, res);});
  }*/
});
