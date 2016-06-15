/* globals Backbone */
/* exported Message */
'use strict';

var Message = Backbone.Model.extend({
  idAttribute: '_id',

  initialize: function() {
    // console.log('DocModel initialize', this);
    // this.listenTo(this, 'all', function(ev, res) {console.log('Message Model', ev, res);});
  }
});
