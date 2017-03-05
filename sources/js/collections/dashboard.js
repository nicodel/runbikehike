/* globals _, Backbone */
'use strict';
var RBH = RBH || {};
RBH.Collections = RBH.Collections || {};

RBH.Collections.Dashboard = Backbone.Collection.extend({
  model: RBH.Models.Item,
  url: 'data/dashboard',
  // initialize: function () {
  //   this.listenTo(this, 'all', function(ev, res) {console.log('DASHBOARD Collection', ev, res);});
  // }
});
