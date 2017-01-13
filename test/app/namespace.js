/* jshint strict: true */

describe('Namespaces', function () {
  'use strict';
  it('should provide the "RBH" object', function () {
    // Should exists and be an object.
    should(RBH).be.an.Object();

    // Should all namespace properties are present.
    should(RBH).have.keys(
      'Collections', 'Models', 'Factory'
    );
  });
});
