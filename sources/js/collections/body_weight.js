/* globals _, Backbone, BodyWeight */
/* exported BodyWeights */
'use strict';
var RBH = RBH || {};
RBH.Collections = RBH.Collections || {};

RBH.Collections.BodyWeight = Backbone.Collection.extend({
  model: RBH.Models.BodyWeight,
  url: 'data/body_weight',
  initialize: function() {
    // this.listenTo(this, 'all', function(ev, res) {console.log('Bodies Collection', ev, res);});
  },
});
var BodyWeights = new RBH.Collections.BodyWeight();
