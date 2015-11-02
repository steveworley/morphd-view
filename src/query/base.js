/**
 * @file
 * Define a class interface for the query object.
 */

'use strict';

const _ = require('underscore');
_.mixin(require('../mixins/qs.underscore.js'));


require('es6-promise').polyfill();
require('isomorphic-fetch');

class QueryBase {

  constructor(url) {
    this.conditions = {};
    this.limit = {};
    this.url = url;
  }

  where(key, value) {
    return this;
  }

  and(key, value) {
    return this;
  }

  not(key, value) {
    return this;
  }

  in(key, values) {
    return this;
  }

  like(key, value) {
    return this;
  }

  limit(key, value) {
    return this;
  }

  buildQueryString() {
    if (_.isEmpty(this.conditions)) {
      return null;
    }

    return _.toQueryString(this.conditions);
  }

  reset() {
    this.conditions = {};
  }

  /**
   * Perform a query to the configured URL.
   *
   * If callback is given execute will handle resolving the promise and will
   * subsequently trigger the callback after the promise has been fulfilled.
   *
   * If no callback is given the promise object will be returned.
   *
   * @param function callback
   *   A callback to execute when the query is successful.
   * @param object context
   *   A context to pass through to the callback.
   *
   * @return Promise
   *   A promise or null.
   */
  execute(callback, context) {
    var url = this.url;

    url += url.slice(-1) == '?' ? '' : '?';
    url += this.buildQueryString();

    // Before processing the query reset the object back to defaults.
    this.reset();

    if (!_.isFunction(callback)) {
      // Fetch returns a promise object if we aren't executing with a valid
      // callback method we will pass the promise object back for handling
      // in the filter.
      //
      // This will require filter to implement the first part of the promise.
      return fetch(url);
    }

    fetch(url)
      .then(function(response) { return response.json() })
      .then(function(body) {
        if (body.error) {
          throw new Error(body.message);
        }
        return callback.call(context, null, body);
      })
      .catch(function(err) { return callback.call(context, err, null); });
  }
}

module.exports = QueryBase;
