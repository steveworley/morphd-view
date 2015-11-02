/**
 * @file
 * Handle rendering a textfield.
 */

const React = require('react');

const TextField = React.createClass({
  render() {
    return (
      <div className="form-group">
        <label htmlFor="{this.props.name}">{this.props.name}</label>
        <input
          className="form-control"
          type="text"
          name={this.prop.name}
          value={this.props.value}
          id={this.prop.name}
          ref={this.prop.name}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
});

module.exports = TextField;
