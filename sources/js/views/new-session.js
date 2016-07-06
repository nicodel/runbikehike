/* jshint browser: true */
/* globals Backbone, microtemplate, Sessions, Factory, Tracking */
/* exported NewSession */
'use strict';

var NewSession = Backbone.NativeView.extend({
  el: '#new-session-view',

  subview: '',

  events: {
    // 'click #switch-to-gps'    : 'swicthToGps',
    'click #select-activity'  : 'activitySelected',
    'click #confirm-add-session-btn'  : 'addNewSession'
  },

  dom: {
    activity    : document.getElementById('new-activity-details'),
  },

  template : microtemplate(document.getElementById('new-session-activity').innerHTML),

  initialize: function () {
    document.getElementById('select-activity').innerHTML = '';
    var activities = Factory.getActivitiesList();
    for (var i = 0; i < activities.length; i++) {
      this.renderIcon(activities[i]);
    }
  },

  renderIcon: function (activity) {
    var label = document.createElement('label');
    label.setAttribute('for', activity.activity);
    var input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'select-activity');
    input.setAttribute('value', activity.activity);
    input.setAttribute('id', activity.activity);
    var img = document.createElement('img');
    img.setAttribute('src', 'img/session/' + activity.family + '/' + activity.activity + '.png');
    img.setAttribute('alt', activity.activity);
    label.appendChild(input);
    label.appendChild(img);
    document.getElementById('select-activity').appendChild(label);
  },

  // swicthToGps: function() {
  //   console.log('switch to gps');
  //   Sessions.trigger('switch-to-gps');
  // },

  activitySelected: function(element) {
    // cleaning previous view (if any)
    if (this.subview) {
      this.subview.remove();
    }
    if (element.target.nodeName === 'INPUT') {
      var activity = element.target.value;
      var session = Factory.getModel(
          'session',
          activity,
          {'activity' : activity});
      this.model.set(session);
      this.subview = Factory.getNewView('session', this.model);
      // console.log('view to be displayed is', this.subview);
      this.el.appendChild(document.createElement('div').innerHTML = this.subview.render().el);
      // add listener to subview to enable/disable the Add button
      this.listenTo(this.subview, 'enable-add', this.enableAdd);
      this.listenTo(this.subview, 'disable-add', this.disableAdd);
    }
  },

/*  enableImport: function() {
    var file_list = this.dom.import_file.files;
    if (file_list.length > 0) {
      this.dom.import_btn.removeAttribute('disabled');
    } else {
      this.dom.import_btn.setAttribute('disabled', 'disabled');
    }
  },*/

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

  addNewSession: function() {
    for (var i = 0; i < this.subview.validated.length; i++) {
      var criteria = this.subview.validated[i];
      if (!criteria) {
        // TODO Manage error messages and invalid values in new-session form
        // console.log('something is not right and session could not be added', this.validated);
        return;
      }
    }
    // console.log('addNewSession - this.model', this.model);
    var s = Sessions.add(this.model);
    console.log('new session to save', s);
    s.save();
    Sessions.trigger('add-new', s);
    // Cleaning Views
    this.subview.remove();
  },

});
