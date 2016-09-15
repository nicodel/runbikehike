/* jshint browser: true */
/* globals Backbone, microtemplate, Sessions, GPSTracks, Factory, Session, GPSTrack */
/* exported NewSession */
'use strict';

var NewSession = Backbone.NativeView.extend({
  el: '#new-session-view',

  gps_id: '',
  session: new Session(),
  gps_track: new GPSTrack(),
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

  activitySelected: function(element) {
    // cleaning previous view (if any)
    if (this.subview) {
      this.subview.remove();
    }
    if (element.target.nodeName === 'INPUT') {
      // this.session = new Session();
      this.session.set({
        'activity_name' : element.target.value
      });
      this.activity_name = element.target.value;
      // this.gps_track = new GPSTrack();
      this.subview = Factory.getNewView('session', this.session);
      // console.log('view to be displayed is', this.subview);
      this.el.appendChild(document.createElement('div').innerHTML = this.subview.render().el);
      // add listener to subview to enable/disable the Add button
      this.listenTo(this.subview, 'enable-add', this.enableAdd);
      this.listenTo(this.subview, 'disable-add', this.disableAdd);
      // add listener to the possible session and gps track import
      this.listenTo(this.subview, 'gps-track-imported', this.registerGPSTrack);
      this.listenTo(this.subview, 'session-defined', this.registerSessionValues);
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
   // model.set('activity_name', this.activity_name);
   this.session = model;
   console.log('Session to register', this.session);
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
    console.log('addNewSession - this.session', this.session);
    console.log('addNewSession - this.gps_track', this.gps_track);

    var s = Sessions.add(this.session);
    console.log('new session to save', s);
    s.save();
    Sessions.trigger('add-new', s);


    //var g = GPSTracks.add(this.gps_track);
    //g.save();

    // Cleaning Views
    this.subview.remove();
  }
});
