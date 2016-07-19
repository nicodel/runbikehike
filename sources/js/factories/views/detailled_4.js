/* jshint browser: true */
/* globals Sessions, Backbone, microtemplate, Preferences, utils
*/
'use strict';

var views = views || {};

views.detailled_4  = Backbone.NativeView.extend({
  el: '#session-view',

  session_id: '',

  template: microtemplate(document.getElementById('session-details-template-3').innerHTML),

  events: {
    'click #session-3-delete' : 'deleteSession'
  },

  initialize: function() {
    // console.log('SessionView initialized', this);
    this.render();
  },

  render: function() {
    var duration = utils.Helpers.formatDuration(this.model.get('duration'));
    this.el.innerHTML = this.template({
      'session_cid' : this.model.get('session_cid'),
      'date'        : utils.Helpers.formatDate(this.model.get('date')),
      'time'        : utils.Helpers.formatTime(this.model.get('date')),
      'calories'    : this.model.get('calories'),
      'duration'    : duration.hour + ':' + duration.min + ':' + duration.sec,
      'activity'    : this.model.get('activity')
    });
  },

  deleteSession: function (el) {
    var session = el.target.getAttribute('session_id');
    this.model.destroy({
      success: function (model, response) {
        console.log('deleteSession - success', model, response);
        Sessions.trigger('removed');
      },
      error: function (model, error) {
        console.log('deleteSession - error', model, error);
      }
    });
  }
});
