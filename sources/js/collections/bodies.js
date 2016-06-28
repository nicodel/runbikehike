/* globals _, Backbone, Body */
/* exported Bodies */
'use strict';

var BodiesCollection = Backbone.Collection.extend({
  model: Body,
  url: '/bodies',
  initialize: function() {
    // this.listenTo(this, 'all', function(ev, res) {console.log('Bodies Collection', ev, res);});
  },
});
var Bodies = new BodiesCollection();
