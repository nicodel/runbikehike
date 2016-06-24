/* jshint browser: true */
/* global Backbone, microtemplate, Preferences, utils */
'use strict';

var views = views || {};

views.sessions_summary_3 = Backbone.NativeView.extend({
  tagName: 'li',

  template: microtemplate(document.getElementById('session-summary-template-3').innerHTML),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(Preferences, 'change', this.render);
  },

  extend: Backbone.Events,

  render: function() {
    var duration = utils.Helpers.formatDuration(this.model.get('duration'));
    this.el.innerHTML = this.template({
      'session_cid' : this.model.get('session_cid'),
      'collection'  : this.model.get('collection'),
      'date'        : utils.Helpers.formatDate(this.model.get('date')),
      'calories'    : this.model.get('calories'),
      'duration'    : duration.hour + ':' + duration.min + ':' + duration.sec,
      'activity'    : this.model.get('activity')
    });
    return this;
  }
});
