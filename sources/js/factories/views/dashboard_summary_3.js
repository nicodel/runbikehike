/* jshint browser: true */
/* globals Backbone, microtemplate, Preferences, utils */
'use strict';

var views = views || {};

views.dashboard_summary_3 = Backbone.NativeView.extend({
  tagName: 'li',

  template: microtemplate(document.getElementById('session-summary-template-3').innerHTML),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(Preferences, 'change', this.render);
  },

  extend: Backbone.Events,

  render: function() {
    // console.log('DASHBOARD SUMMARY - this.model', this.model);
    var duration = utils.Helpers.formatDuration(this.model.get('duration'));
    var activity = this.model.get('activity');
    this.el.innerHTML = this.template({
      'session_cid' : this.model.cid,
      'collection'  : this.model.get('collection'),
      'date'        : utils.Helpers.formatDate(this.model.get('date')),
      'calories'    : this.model.get('calories'),
      'duration'    : duration.hour + ':' + duration.min + ':' + duration.sec,
      'activity'    : activity,
      'icon_path'   : 'img/' + this.model.get('type') + '/' + this.model.get('family') + '/' + activity + '.png'
    });
    return this;
  }
});
