/**
 * @file
 * Render a row for the view output.
 */

const React = require('react');

const Row = React.createClass({

  getDefaultProps() {
    return {
      data: {
        title: [{value: null}],
        body: [{value: null}]
      }
    }
  },

  render() {
    return (
        <div className="react-view-row">
          <h3>{this.props.data.title[0].value}</h3>
          <div className="react-view-row-body" dangerouslySetInnerHTML={{__html: this.props.data.body[0].value}}></div>
        </div>
    );
  }
})


module.exports = Row;
