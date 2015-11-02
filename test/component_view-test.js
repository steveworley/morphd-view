/**
 * @file
 * Tests for the View component.
 */

var React = require('react/addons');
var assert = require('assert');
var TestUtils = React.addons.TestUtils;
var fetchMock = require('fetch-mock');

// The React component.
var view = require('../lib/view.js');

describe('View Component', function() {
  before('setup up mocking the component', function() {
    var mocked = require('./fixtures/parseQueryResponse')
    fetchMock.registerRoute(mocked);
    fetchMock.mock({greed: 'none'});
  });

  after(function() {
    fetchMock.restore();
    fetchMock.unregisterRoute('parse');
    fetchMock.unregisterRoute('parse_error');
  });

  it('can do things', function() {
    assert(true);
  });
});
