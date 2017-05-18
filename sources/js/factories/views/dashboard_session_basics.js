/* jshint browser: true */
/* globals Backbone, microtemplate, Preferences, utils */
'use strict';

var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};
RBH.Factory.Views = RBH.Factory.Views || {};

RBH.Factory.Views.dashboard_session_basics = Backbone.NativeView.extend({
  tagName: 'li',

  template: microtemplate(document.getElementById('dashboard-session-template').innerHTML),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    // this.listenTo(Preferences, 'change', this.render);
  },

  extend: Backbone.Events,

  render: function() {
    // console.log('DASHBOARD SESSION BASICS - this.model', this.model);
    // console.log('date', this.model);
    var duration = utils.Helpers.formatDuration(this.model.get('time_interval').duration);
    var activity = this.model.get('activity_name');
    this.el.innerHTML = this.template({
      'session_cid' : this.model.cid,
      'collection'  : this.model.get('collection'),
      'date'        : utils.Helpers.formatDate(this.model.get('date')),
      'calories'    : this.model.get('calories'),
      'duration'    : duration.hour + ':' + duration.min + ':' + duration.sec,
      'activity'    : activity,
      'icon_path'   : 'img/activities/' + activity + '.png'
    });
    return this;
  }
});
