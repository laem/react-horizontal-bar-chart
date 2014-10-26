'use strict';

describe('HBar', function () {
  var HBar, component;

  beforeEach(function () {
    HBar = require('../../../src/scripts/components/HBar.jsx');
    component = HBar();
  });

  it('should create a new instance of HBar', function () {
    expect(component).toBeDefined();
  });
});
