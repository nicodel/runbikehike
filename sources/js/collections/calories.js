/* globals _, Backbone */
'use strict';
var RBH = RBH || {};
RBH.Collections = RBH.Collections || {};

RBH.Collections.Calories = Backbone.Collection.extend({
  model: RBH.Models.Calorie,
  url: 'data/calories',
});
