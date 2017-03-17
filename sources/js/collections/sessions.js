/* globals _, Backbone */
'use strict';
var RBH = RBH || {};
RBH.Collections = RBH.Collections || {};

var Sessions = Backbone.Collection.extend({
  model: RBH.Models.Session,
  url: 'data/sessions',
  initialize: function() {
    this.listenTo(this, 'all', function(ev, res) {console.log('SESSIONS Collection', ev, res);});
  }
});
RBH.Collections.Sessions = new Sessions();
