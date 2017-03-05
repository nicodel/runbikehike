/* jshint strict: true */

describe('Factory', function () {
  'use strict';
  it('should provide the "RBH.Factory" object', function () {
    // Should exists and be an object.
    should(RBH.Factory).be.an.Object();

    // Should all namespace properties are present.
    should(RBH.Factory).have.keys(
      'Views', 'Activities'
    );
  });

  describe('getSessionNewView', function () {
    it('should return an Object containing all activity views', function () {
      var view = RBH.Factory.getSessionNewView(new RBH.Models.Session({activity_name: 'bmx'}));
      should(view).be.an.Object();
      should(view).have.keys('basics', 'import_form', 'altitude', 'distance');
    });
  });

  describe('getDashboardSessionViews', function () {
    it('should return an Object containing all subviews', function () {
      var view = RBH.Factory.getDashboardSessionViews(
        new RBH.Models.Session({
          activity_name : 'bmx'
        })
      );
      should(view).be.an.Object();
      should(view).have.keys('basics', 'distance');
    });
  });

  /*describe('getDashboardMessageView', function () {
    it('should return an Object representing a View', function () {
      var view = RBH.Factory.getDashboardMessageView(new RBH.Models.Message());
      should(view).be.an.Object();
    });
  });*/
});
