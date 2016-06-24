/* jshint browser: true */
/* globals Backbone, microtemplate, Preferences, utils
*/
'use strict';

var views = views || {};

views.detailled_4  = Backbone.NativeView.extend({
  el: '#session-view',

  session_id: '',

  template: microtemplate(document.getElementById('session-details-template-3').innerHTML),

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

});
