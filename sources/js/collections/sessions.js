/* globals _, Backbone */
'use strict';
var RBH = RBH || {};
RBH.Collections = RBH.Collections || {};

RBH.Collections.Sessions = Backbone.Collection.extend({
  model: RBH.Models.Session,
  url: 'data/sessions',
  initialize: function() {
    // this.listenTo(this, 'all', function(ev, res) {console.log('SESSIONS Collection', ev, res);});
  },
});
