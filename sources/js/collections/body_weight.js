/* globals _, Backbone, BodyWeight */
/* exported BodyWeights */
'use strict';

var BodyWeightCollection = Backbone.Collection.extend({
  model: BodyWeight,
  url: '/body_weight',
  initialize: function() {
    // this.listenTo(this, 'all', function(ev, res) {console.log('Bodies Collection', ev, res);});
  },
});
var BodyWeights = new BodyWeightCollection();
