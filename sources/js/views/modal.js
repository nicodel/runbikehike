/* jshint browser: true */
/* globals Backbone, microtemplate */
'use strict';
var RBH = RBH || {};
RBH.Views = RBH.Views || {};

RBH.Views.Modal = Backbone.NativeView.extend({
  el: '#modal',
  template: microtemplate(document.getElementById('modal-delete-template').innerHTML),
  events: {
    'click #btn-confirm-delete' : 'deleteConfirmed',
    'click #btn-cancel-delete'  : 'hideModal'
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.el.setAttribute('disabled', 'false');
    this.el.className = 'modal';
    this.el.innerHTML = this.template({
      'session_cid' : this.model.get('session_cid'),
      'name'        : this.model.get('name')
    });
    return this;
  },

  deleteConfirmed: function () {
    var that = this;
    this.model.destroy({
      success: function (model, response) {
        console.log('deleteSession - success', model, response);
        RBH.Collections.Sessions.trigger('removed');
        that.hideModal();
      },
      error: function (model, error) {
        console.log('deleteSession - error', model, error);
      }
    });
  },

  hideModal: function () {
    this.el.setAttribute('disabled', 'true');
    this.el.className = 'modal hidden';
  }
});
