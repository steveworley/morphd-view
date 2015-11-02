// __tests__/query/base.js

var assert = require('assert');
var fetchMock = require('fetch-mock');
var Parse = require('../src/query/parse');

describe('ParseQuery', function() {

  it('extends QueryBase', function() {
    var QueryBase = require('../src/query/base');
    assert(Parse.prototype instanceof QueryBase);
  });

  describe('#where()', function() {
    var query = new Parse('http://faekurl.com');

    it('can add where conditions', function() {
      query.where('field', 'value');
      assert.deepEqual(query.conditions, {field: 'value'});
    });

    it('can build a valid query string', function() {
      assert.ok(query.buildQueryString(), 'where={"field":{"$not":"value"}}');
    });

    it('only accepts string values as the key', function() {
      assert.throws(function() {
        query.where(['array'], 'value')
      }, TypeError);
      assert.throws(function() {
       query.where({field: 'value'}, 'value')
      }, TypeError);
      assert.throws(function() {
       query.where(null, 'value')
      }, TypeError);
      assert.throws(function() {
       query.where(false, 'value')
      }, TypeError);
      assert.throws(function() {
       query.where([], 'value')
      }, TypeError);
    });

    it('only accepts string values as the value', function() {
      assert.throws(function() {
        query.where('value', ['value'])
      }, TypeError);
      assert.throws(function() {
       query.where('value', {field: 'value'})
      }, TypeError);
      assert.throws(function() {
       query.where('value', null)
      }, TypeError);
      assert.throws(function() {
       query.where('value', false)
      }, TypeError);
      assert.throws(function() {
       query.where('value', [])
      }, TypeError);
    });
  });

  describe('#not()', function() {
    var q = new Parse('http://faekurl.com');

    it('can add not conditions', function() {
      q.not('field', 'value');
      assert.deepEqual(q.conditions, {field: {'$not': 'value'}});
    });

    it('can build a valid query string for not', function() {
      q.not('field', 'value');
      assert.equal(q.buildQueryString(), 'where={"field":{"$not":"value"}}')
    });

    it('only accepts string values as the key', function() {
      assert.throws(function() {
        q.not(['array'], 'value')
      }, TypeError);
      assert.throws(function() {
       q.not({field: 'value'}, 'value')
      }, TypeError);
      assert.throws(function() {
       q.not(null, 'value')
      }, TypeError);
      assert.throws(function() {
       q.not(false, 'value')
      }, TypeError);
      assert.throws(function() {
       q.not([], 'value')
      }, TypeError);
    });

    it('only accepts string values as the value', function() {
      assert.throws(function() {
        q.not('value', ['value'])
      }, TypeError);
      assert.throws(function() {
       q.not('value', {field: 'value'})
      }, TypeError);
      assert.throws(function() {
       q.not('value', null)
      }, TypeError);
      assert.throws(function() {
       q.not('value', false)
      }, TypeError);
      assert.throws(function() {
       q.not('value', [])
      }, TypeError);
    });
  });

  describe('#in()', function() {
    var q = new Parse('http://faekurl.com');

    it('can add in conditions', function() {
      q.in('field', 'list', 'of', 'values');
      assert.deepEqual(q.conditions, {field: {'$in': ['list', 'of', 'values']}});
    });

    it('can build a valid query string for in', function() {
      assert.equal(q.buildQueryString(), 'where={"field":{"$in":["list","of","values"]}}')
    });

    it('only accepts string values as the key', function() {
      assert.throws(function() {
        q.in(['array'], 'value')
      }, TypeError);
      assert.throws(function() {
       q.in({field: 'value'}, 'value')
      }, TypeError);
      assert.throws(function() {
       q.in(null, 'value')
      }, TypeError);
      assert.throws(function() {
       q.in(false, 'value')
      }, TypeError);
      assert.throws(function() {
       q.in([], 'value')
      }, TypeError);
    });
  });

  describe('#like', function() {
    var q = new Parse('http://faekurl.com');

    it('can add like conditions', function() {
      q.like('field', 'value');
      assert.deepEqual(q.conditions, {field: {'$like': 'value'}});
    });

    it('can build a valid query string for like', function() {
      assert.equal(q.buildQueryString(), 'where={"field":{"$like":"value"}}')
    });

    it('only accepts string values as the key', function() {
      assert.throws(function() {
        q.like(['array'], 'value')
      }, TypeError);
      assert.throws(function() {
       q.like({field: 'value'}, 'value')
      }, TypeError);
      assert.throws(function() {
       q.like(null, 'value')
      }, TypeError);
      assert.throws(function() {
       q.like(false, 'value')
      }, TypeError);
      assert.throws(function() {
       q.like([], 'value')
      }, TypeError);
    });

    it('only accepts string values as the value', function() {
      assert.throws(function() {
        q.like('value', ['value'])
      }, TypeError);
      assert.throws(function() {
       q.like('value', {field: 'value'})
      }, TypeError);
      assert.throws(function() {
       q.like('value', null)
      }, TypeError);
      assert.throws(function() {
       q.like('value', false)
      }, TypeError);
      assert.throws(function() {
       q.like('value', [])
      }, TypeError);
    });
  });


  describe('#setLimit()', function() {
    var q = new Parse('http://faekurl.com');

    it('can change the limit', function() {
      q.setLimit(10);
      assert.equal(q.limit, 10);
    });

    it('only accepts numeric limits', function() {
      assert.throws(function() {
       q.setLimit('string')
      }, TypeError);
    });
  });

  describe('#execute()', function() {
    var query, mocked;

    before(function() {
      query = new Parse('http://testquery.com/query');
      mocked = require('./fixtures/parseQueryResponse')
      fetchMock.registerRoute(mocked);
      fetchMock.mock({greed: 'none'});
    });

    after(function() {
      fetchMock.restore();
      fetchMock.unregisterRoute('parse');
      fetchMock.unregisterRoute('parse_error');
    })

    it('can retrieve data', function() {
      query.where('nid', '4');
      query.execute(function(err, data) {
        assert(!err);
        assert.deepEqual(mocked[0].response.body, data);
      });
    });

    it('can resolve a failed promise', function() {
      query.where(':fail', 'true');
      query.execute(function(err, data) {
        assert(err instanceof Error);
        assert.equal(mocked[1].response.body.message, err.message);
        assert(!data);
      });
    });

    it('returns a valid promise object if no callback is given', function() {
      query.where('nid', '4');
      var promise = query.execute();
      assert.ok(promise instanceof Promise);
    });
  });
});
