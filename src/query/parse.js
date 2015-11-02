/**
 * @file
 * Parse like query object.
 */

'use strict';

const QueryBase = require('./base');
const _ = require('underscore');

class ParseQuery extends QueryBase {
  constructor(url) {
    super(url);
  }

  /**
   * Add a condition to the query.
   *
   * @param string key
   *   The field to add to the query.
   * @param string value
   *   The value for key.
   */
  where(key, value) {
    if (!_.isString(key)) {
      throw new TypeError('Key must be a string ' + typeof key + ' given.');
    }

    if (!_.isString(value)) {
      throw new TypeError('Value must be a string ' + typeof value + ' given.');
    }

    this.conditions[key] = value;
    return this;
  }

  /**
   * Semantic method for where.
   *
   * @see this.where
   */
  and(key, value) {
    return this.where(key, value);
  }

  /**
   * Add a not condition to the query.
   *
   * @param string key
   *   The field to add to the query.
   * @param string value
   *   The value for key.
   */
  not(key, value) {
    if (!_.isString(key)) {
      throw new TypeError('Key must be a string ' + typeof key + ' given.');
    }

    if (!_.isString(value)) {
      throw new TypeError('Key must be a string ' + typeof value + ' given.');
    }

    this.conditions[key] = {"$not": value};
    return this;
  }

  /**
   * Add an in condition to the query.
   *
   * @param string key
   *   The key to add to the query.
   */
  in(key /*, [params] */) {
    if (!_.isString(key)) {
      throw new TypeError('Key must be a string ' + typeof key + ' given.');
    }

    var terms = _.toArray(arguments).slice(1);
    this.conditions[key] = {"$in": terms};
    return this;
  }

  /**
   * Add a like condition to the query.
   *
   * @param string key
   *   The field to add to the query.
   * @param string value
   *   The value for key.
   */
  like(key, value) {
    if (!_.isString(key)) {
      throw new TypeError('Key must be a string ' + typeof key + ' given.');
    }

    if (!_.isString(value)) {
      throw new TypeError('Key must be a string ' + typeof value + ' given.');
    }

    this.conditions[key] = {"$like": value};
    return this;
  }

  /**
   * Add a limit to the query.
   *
   * @param int int
   *   Adds a limit to the query.
   */
  setLimit(int) {
    if (!_.isNumber(int)) {
      throw new TypeError('Limit must be a number ' + typeof int + ' given.');
    }

    this.limit = int;
  }

  buildQueryString() {
    var qs = [];

    if (_.isObject(this.conditions)) {
      qs.push('where=' + JSON.stringify(this.conditions));
    }

    return qs.join('&');
  }
}

module.exports = ParseQuery;
