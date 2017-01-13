/* globals _, Backbone, Message, Factory */
/* exported Messages */
'use strict';
var RBH = RBH || {};
RBH.Collections = RBH.Collections || {};

RBH.Collections.Messages = Backbone.Collection.extend({
  model: RBH.Models.Message,
  url: 'data/messages',

  initialize: function() {
    // console.log('DocsCollection initialize');
    // this.listenTo(this, 'all', function(ev, res) {console.log('MESSAGES Collection', ev, res);});
    this.listenTo(this, 'sync', this.synced);
  },

  synced: function(ev, res) {
    if (ev.length === 0) {
      console.log('adding the welcome message');
      var m = this.add({
        'activity'  : 'message',
        'date'      : new Date().toISOString(),
        'text'      : 'Welcome to Run, Bike, Hike...'
      });
      m.save();
    }
  }
});
var Messages = new RBH.Collections.Messages();
