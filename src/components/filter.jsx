/**
 * @file
 * Implement the filter component.
 */

const React = require('react');
const _ = require('underscore');

const Filter = React.createClass({

  /**
   * {@inheritdoc}
   */
  getDefaultProps() {
    return {
      fields: {},
      query: {}
    }
  },

  /**
   * {@inheritdoc}
   */
  getInitialState() {
    var fields = {};
    var defualts = {
      operator: 'where',
      component: require('./form/textfield'),
      onChange: this.handleUpdate
    }

    _.each(this.props.fields, function(settings, field) {
      fields[field] = _.extend(defaults, {name: field}, settings);
    });

    return { fields: fields };
  },

  /**
   * Handle the form submit action.
   *
   * For all fields that have been assigned a value add them to the parents
   */
  handleSubmit(event) {
    _.each(this.state.fields, function(settings, field) {
      if (settings.value) {
        this.props.query[settings.operator](field, settings.value);
      }
    }.bind(this));

    this.props.query.execute().then(this.props.handleQuery);
    return false;
  },

  /**
   * {@inheritdoc}
   *
   * Render the filter form component.
   */
  render() {
    var fields = [];

    _.each(this.state.fields, function(settings, field) {
      fields.push(React.createElement(settings.component, _.extend({}, settings)));
    });

    return (
      <div className="view-exposed-form">
        <form>
          { fields }
          <button onClick={this.handleSubmit}>Filter</button>
        </form>
      </div>
    );
  }

});

module.exports = Filter;
