/* globals _, Backbone, Session */
/* exported Sessions */
'use strict';

var SessionsCollection = Backbone.Collection.extend({
  model: Session,
  url: 'data/sessions',
  initialize: function() {
    // this.listenTo(this, 'all', function(ev, res) {console.log('SESSIONS Collection', ev, res);});
  },
});
var Sessions = new SessionsCollection();
