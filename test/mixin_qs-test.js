/**
 * Test the to and from query string mixin.
 */
var assert = require('assert');
var _ = require('underscore');
_.mixin(require('../src/mixins/qs.underscore'));

describe('Query string mixins', function() {

  it('can be called', function() {
    assert(_.toQueryString);
    assert(_.fromQueryString);
  });

  it('can convert objects into valid query strings', function() {
    assert(_.toQueryString({field: 'value'}), '?field=value');
    assert(_.toQueryString({field: 'value', field2: 'value'}), '?field=value&field2=value');
    assert(_.toQueryString({field:['something', 'something']}), '?field=[something,something]');
    assert(_.toQueryString(['something, something']), '?0=[something,something]');
  });

  it('can convert query strings into objects', function() {
    assert(_.fromQueryString('?field=value'), {field: 'value'});
    assert(_.fromQueryString('?field=value&field2=value'), {field: 'value', field2: 'value'});
    assert(_.fromQueryString('?field=[something,something]'), {field:['something', 'something']});
    assert(_.fromQueryString('?0=[something,something]'), {0: ['something', 'something']});
  });

});
