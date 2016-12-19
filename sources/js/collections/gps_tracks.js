/* globals _, Backbone, GPSTrack */
/* exported GPSTracks */
'use strict';

var GPSTracksCollection = Backbone.Collection.extend({
  model: GPSTrack,
  url: 'data/gps_tracks',
  initialize: function() {
    // this.listenTo(this, 'all', function(ev, res) {console.log('GPSTRACKS Collection', ev, res);});
  },
});
var GPSTracks = new GPSTracksCollection();
