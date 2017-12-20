/* globals _, Backbone */
'use strict';
var RBH = RBH || {};
RBH.Collections = RBH.Collections || {};

var GPSTracks = Backbone.Collection.extend({
  model: RBH.Models.GPSTrack,
  url: 'data/gps_tracks',
  // initialize: function() {
    // this.listenTo(this, 'all', function(ev, res) {console.log('GPSTRACKS Collection', ev, res);});
  // },
});
RBH.Collections.GPSTracks = new GPSTracks();
