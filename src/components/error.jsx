/**
 * @file
 * Render an error alert.
 */

const React = require('react');

const Error = React.createClass({
  getDefaultProps() {
    return {
      data: null
    }
  },

  render() {
    return (
      <div className="alert alert-danger alert-dismissible">
        <button className="close"><span>&times;</span></button>
        <strong>Oh Snap!</strong> {this.props.data}
      </div>
    );
  }
});

module.exports = Error;
