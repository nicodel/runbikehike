/* jshint strict: true */

describe('Models', function () {
  'use strict';
  describe('Session', function () {
    this.save_spy = '';
    beforeEach(function () {
      this.session = new RBH.Models.Session();
      this.save_spy = sinon.spy(this.session, 'save');
    });
    afterEach(function () {
      this.session.save.restore();
    });

    it('should return an Object', function () {
      // Create empty note model.
      should(this.session).be.an.Object();
    });

    it('sets passed attributes', function () {
      this.session.set({
        activity_name : 'bmx'
      });
      should(this.session.get('activity_name')).be.equal('bmx');
    });
    /*it('should update server when activity_name is changed', function () {
      this.session.set({
        activity_name : 'running'
      });
      console.log('this.save_spy', this.save_spy);
      this.save_spy.should.be.calledOnce();
    });*/
  });

  describe('Messages', function () {
    it('should return an Object, with a date attribute', function () {
      var model = new RBH.Models.Message();
      should(model).be.an.Object();
      should(model.get('date')).be.a.Date();
    });

    it('should return passed attributes', function () {
      var model = new RBH.Models.Message({
        type    : 'message',
        message : 'Welcome to Run, Bike, Hike...'
      });
      should(model.get('type')).be.equal('message');
    });
  });
});
