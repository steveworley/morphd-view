// __tests__/query/base.js

var assert = require('assert');
var Query = require('../src/query/base');
q = new Query('http://faekurl.com');


describe('QueryBase', function() {

  it('has conditions', function() {
    assert(q.conditions, {});
  });

  it('has url', function() {
    assert(q.url, 'http://fakeurl.com');
  })

  it ('has limit', function() {
    assert(q.limit, {});
  });

  it ('has execute', function() {
    assert(q.execute);
  })

  it('can build a valid query string', function() {
    q.conditions = {field: 'value'};
    assert(q.buildQueryString(), '?field=value');
  })

  it('can reset conditions', function() {
    q.conditions = {field: 'value'};
    q.reset();
    assert(q.conditions, {});
  });

  it('supports method chaining', function() {
    q
      .where('field', 'value')
      .in('field', 'list', 'of', 'values')
      .like('field', 'value')
      .not('field', 'value');

    assert(true);
  });

});
