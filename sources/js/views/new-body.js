/* jshint browser: true */
/* globals Backbone, microtemplate, Bodies, Factory, Tracking */
/* exported NewBody */
'use strict';

var NewBody = Backbone.NativeView.extend({
  el: '#new-body-view',

  subview: '',

  events: {
    'click #select-body'          : 'bodySelected',
    'click #confirm-add-body-btn' : 'addNewBody'
  },

  dom: {
    activity : document.getElementById('new-activity-details'),
  },

  template : microtemplate(document.getElementById('new-session-activity').innerHTML),

  initialize: function () {
    document.getElementById('select-body').innerHTML = '';
    var bodies = Factory.getBodiesList();
    for (var i = 0; i < bodies.length; i++) {
      this.renderIcon(bodies[i]);
    }
  },

  renderIcon: function (body) {
    var label = document.createElement('label');
    label.setAttribute('for', body.activity);
    var input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'select-body');
    input.setAttribute('value', body.activity);
    input.setAttribute('id', body.activity);
    var img = document.createElement('img');
    img.setAttribute('src', 'img/body/' + body.activity + '.png');
    img.setAttribute('alt', body.activity);
    label.appendChild(input);
    label.appendChild(img);
    document.getElementById('select-body').appendChild(label);
  },

  bodySelected: function(element) {
    console.log('bodySelected', element);
    // cleaning previous view (if any)
    if (this.subview) {
      this.subview.remove();
    }
    if (element.target.nodeName === 'INPUT') {
      var body = element.target.value;
      var session = Factory.getModel(
          'body',
          body,
          {'activity' : body});
      this.model.set(session);
      this.subview = Factory.getNewView('body', this.model);
      // console.log('view to be displayed is', this.subview);
      this.el.appendChild(document.createElement('div').innerHTML = this.subview.render().el);
      // add listener to subview to enable/disable the Add button
      this.listenTo(this.subview, 'enable-add', this.enableAdd);
      this.listenTo(this.subview, 'disable-add', this.disableAdd);
    }
  },

  enableAdd: function() {
    var btn = document.getElementById('confirm-add-session-btn');
    console.log('enable-add', btn.getAttribute('disabled'));
    if (btn.getAttribute('disabled') === 'disabled') {
      btn.removeAttribute('disabled');
    }
  },

  disableAdd: function() {
    var btn = document.getElementById('confirm-add-session-btn');
    console.log('disable-add', btn.getAttribute('disabled'));
    if (btn.getAttribute('disabled') === null) {
      btn.setAttribute('disabled', 'disabled');
    }
 },

  addNewBody: function() {
    for (var i = 0; i < this.subview.validated.length; i++) {
      var criteria = this.subview.validated[i];
      if (!criteria) {
        // TODO Manage error messages and invalid values in new-session form
        // console.log('something is not right and session could not be added', this.validated);
        return;
      }
    }
    // console.log('addNewSession - this.model', this.model);
    var b = Bodies.add(this.model);
    console.log('new session to save', b);
    b.save();
    Bodies.trigger('add-new', b);
    // Cleaning Views
    this.subview.remove();
  }

});
