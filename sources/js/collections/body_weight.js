/* globals _, Backbone */
'use strict';
var RBH = RBH || {};
RBH.Collections = RBH.Collections || {};

RBH.Collections.BodyWeights = Backbone.Collection.extend({
  model: RBH.Models.BodyWeight,
  url: 'data/body_weight',
  initialize: function() {
    // this.listenTo(this, 'all', function(ev, res) {console.log('Bodies Collection', ev, res);});
  },
});
