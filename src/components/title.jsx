/**
 * @file
 * Display a title.
 */

const React = require('react');

const Title = React.createClass({
  render() {
    return (
      <h1 className='view-title'>{ this.props.data }</h1>
    );
  }
});

module.exports = Title;

