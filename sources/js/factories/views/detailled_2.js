/* jshint browser: true */
/* globals Sessions, Backbone, microtemplate, Preferences, utils
*/
'use strict';

var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};
RBH.Factory.Views = RBH.Factory.Views || {};

RBH.Factory.Views.detailled_2 = Backbone.NativeView.extend({
  el: '#session-view',

  session_id: '',

  dom: {
    map : document.getElementById('session-map-container')
  },

  template: microtemplate(document.getElementById('body-details-template').innerHTML),

  events: {
    'click #session-2-delete' : 'deleteSession'
  },

  initialize: function() {
    // console.log('SessionView initialized', this);
    this.render();
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
  },

  render: function() {
    this.el.innerHTML = this.template({
      'session_cid' : this.model.cid,
      'date'        : utils.Helpers.formatDate(this.model.get('date')),
      'value'       : this.model.get('weight')
    });
  }
});
