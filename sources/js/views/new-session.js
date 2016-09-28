/* jshint browser: true */
/* globals Backbone, microtemplate, Sessions, GPSTracks, Factory, Session, GPSTrack */
/* exported NewSession */
'use strict';

var NewSession = Backbone.NativeView.extend({
  el: '#new-session-view',

  gps_id: '',
  model: new Session(),
  gps_track: '',
  activity_name: '',

  subview: '',

  events: {
    'click #select-activity'          : 'activitySelected',
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
    this.listenTo(this.model, 'data-imported', this.renderImportedData);
  },

  renderIcon: function (activity) {
    var label = document.createElement('label');
    label.setAttribute('for', activity);
    var input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'select-activity');
    input.setAttribute('value', activity);
    input.setAttribute('id', activity);
    var img = document.createElement('img');
    img.setAttribute('src', 'img/session/' + activity + '.png');
    img.setAttribute('alt', activity);
    label.appendChild(input);
    label.appendChild(img);
    document.getElementById('select-activity').appendChild(label);
  },

  activitySelected: function(element) {
    // cleaning previous view (if any)
    if (this.subview) {
      this.subview.remove();
    }
    if (element.target.nodeName === 'INPUT') {
      this.model.set({
        'activity_name' : element.target.value
      });
      this.activity_name = element.target.value;
      // this.subview = Factory.getNewView('session', this.model);
      var views = Factory.getSessionNewView(this.model);
      console.log('views to be displayed is', views);

      if (views.import_form_subview) {
        var import_form_subview = views.import_form_subview;
        this.el.appendChild(document.createElement('div').innerHTML = import_form_subview.render().el);
      }

      this.subview = views.basic_view;
      this.el.appendChild(document.createElement('div').innerHTML = this.subview.render().el);

      if (views.altitude_subview) {
        this.el.appendChild(document.createElement('div').innerHTML = views.altitude_subview.render().el);
      }
      if (views.distance_subview) {
        this.el.appendChild(document.createElement('div').innerHTML = views.distance_subview.render().el);
      }

      // add listener to subview to enable/disable the Add button
      this.listenTo(this.subview, 'enable-add', this.enableAdd);
      this.listenTo(this.subview, 'disable-add', this.disableAdd);
      // add listener to the possible session and gps track import
      this.listenTo(this.subview, 'gps-track-imported', this.registerGPSTrack);
      this.listenTo(this.subview, 'session-defined', this.registerSessionValues);
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

 registerGPSTrack: function (model) {
   console.log('GPS track to register', model);
   this.gps_track.set(model);
   this.gps_id = this.gps_track.get('cid');
 },

 registerSessionValues: function (model) {
   console.log('model to store as a session', model);
   if (model.get('gps_track').available === true) {
     model.set('gps_track', {
       'available'  : true,
       'track_id'   : this.gps_id
     });
   }
   this.model = model;
   console.log('Session to register', this.model);
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
    console.log('addNewSession - this.model', this.model);
    console.log('addNewSession - this.gps_track', this.gps_track);

    var s = Sessions.add(this.model);
    console.log('new session to save', s);
    s.save();
    Sessions.trigger('add-new', s);


    //var g = GPSTracks.add(this.gps_track);
    //g.save();

    // Cleaning Views
    this.subview.remove();
  }
});
