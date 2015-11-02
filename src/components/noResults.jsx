/**
 * @file
 * Render the no results block.
 */

const React = require('react');

const NoResults = React.createClass({
  render() {
    return (
      <div className="alert alert-success">
        <p><strong>All systems operational</strong></p>
      </div>
    )
  }
});

module.exports = NoResults;
