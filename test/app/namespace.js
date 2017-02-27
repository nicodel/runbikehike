/* jshint strict: true */

describe('Namespaces', function () {
  'use strict';
  it('should provide the "RBH" object', function () {
    // Should exists and be an object.
    should(RBH).be.an.Object();
  });

  it('should contain Views key, with the right properties', function () {
    should(RBH).have.keys('Views');
    should(RBH.Views).have.keys('Dashboard', 'Indicators', 'Modal', 'Navigation', 'NewBodyWeight', 'NewSession', 'Preferences', 'Reports', 'Session', 'Sessions');
  });

  it('should contain Collections key, with the right properties', function () {
    should(RBH).have.keys('Collections');
    should(RBH.Collections).have.keys('BodyWeights', 'Calories', 'Dashboard', 'GPSTracks', 'Messages', 'Sessions');
  });

  it('should contain Models key, with the right properties', function () {
    should(RBH).have.keys('Models');
    should(RBH.Models).have.keys('BodyWeight', 'Calorie', 'GPSTrack', 'Item', 'Message', 'Preferences', 'Session');
  });

  it('should contain Factory key', function () {
    should(RBH).have.keys('Factory');
  });
});
