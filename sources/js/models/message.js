/* globals Backbone */
/* exported Message */
'use strict';

var Message = Backbone.Model.extend({
  idAttribute: '_id',

  initialize: function() {
    // console.log('DocModel initialize', this);
    // this.listenTo(this, 'all', this.something);
  },

  something: function(ev, res) {
    console.log('Something on DocModel', ev, res);
  }
});
