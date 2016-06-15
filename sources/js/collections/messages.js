/* globals _, Backbone, Message, Factory */
/* exported Messages */
'use strict';

var MessagesCollection = Backbone.Collection.extend({
  model: Message,

  url: '/messages',

  initialize: function() {
    // console.log('DocsCollection initialize');
    this.listenTo(this, 'all', function(ev, res) {console.log('MESSAGES Collection', ev, res);});
    this.listenTo(this, 'sync', this.synced);
  },

  synced: function(ev, res) {
    if (ev.length === 0) {
      console.log('adding the welcome message');
      var welcome = Factory.getModel(
        'message', {
          'activity'  : 'message',
          'date'      : new Date().toISOString(),
          'text'      : 'Welcome to Run, Bike, Hike...'
      });
      var m = this.add(welcome);
      m.save();
    }
  }
});
var Messages = new MessagesCollection();
