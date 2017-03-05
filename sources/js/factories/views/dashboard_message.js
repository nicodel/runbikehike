/* jshint browser: true */
/* globals Backbone, microtemplate, Preferences, utils */
'use strict';
var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};
RBH.Factory.Views = RBH.Factory.Views || {};

RBH.Factory.Views.dashboard_message = Backbone.NativeView.extend({
  tagName: 'li',

  template: microtemplate(document.getElementById('dashboard-message-template').innerHTML),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(Preferences, 'change', this.render);
  },

  extend: Backbone.Events,

  render: function() {
    // console.log('DASHBOARD MESSAGE - this.model', this.model);
    this.el.innerHTML = this.template({
      'date'  : utils.Helpers.formatDate(this.model.get('date')),
      'text'  : this.model.get('message')
    });
    return this;
  }
});
