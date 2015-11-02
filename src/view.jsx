/**
 * @file
 * View interface.
 */

'use strict';

const React = require('react');
const _ = require('underscore');

const View = React.createClass({

  /**
   * {@inerhtidoc}
   *
   * We allow various view components to be passed in as properties when
   * using the view component. This will allow us to define defaults if
   * none are present during initialisation.
   */
  getDefaultProps() {
    return {
      title: null,
      filter: false,
      pagination: false,
      titleComponent: require('./components/title'),
      rowComponent: require('./components/row'),
      filterComponent: require('./components/filter'),
      paginationComponent: require('./components/pagination'),
      errorComponent: require('./components/error'),
      noResultsComponent: require('./components/noResults')
    };
  },

  /**
   * {@ineheritdoc}
   *
   * During the initial state we will construct a query object. We cannot set
   * a default in the props for this as it will not create a new instance when
   * another component is used.
   */
  getInitialState() {
    return {
      data: [],
      // query: new query(this.props.url),
      error: null
    }
  },

  /**
   * {@inheritdoc}
   *
   * If the component has query properties passed in we can render the view
   * initially. This will trigger the necessary updates to the query object
   * and then perform the query.
   */
  componentWillMount() {
    if (this.props.query) {
      _.extend(this.state.query, this.props.query);
      this.state.query.exectue().then(this.handleQuery.bind(this));
    }
  },

  /**
   * Callback for the query execute method.
   *
   * This updates the state of the component. We assume that all data
   * processing is done during the query execute method and we trust
   * that the data will be compatible with row components.
   */
  handleQuery(data) {
    this.setState({data: data});
  },

  /**
   * {@inerhitdoc}
   *
   * Render the view component.
   */
  render() {
    var filter, pagination, error, title, rows = [];

    if (this.props.title) {
      title = React.createElement(this.props.titleComponent, this.props.title);
    }

    if (this.props.filter) {
      filter = React.createElement(this.props.filterComponent, {fields: this.props.fields, handleQuery: this.handleQuery.bind(this)});
    }

    if (this.props.pagination) {
      pagination = React.createElement(this.props.paginationComponent);
    }

    if (this.state.error) {
      error = React.createElement(this.props.errorComponent, {data: this.state.error});
    }

    // Build the rows based on the data from the executed query.
    _.each(this.state.data, function(data, i) {
      rows.push(React.createElement(this.props.rowComponent, {data: data}));
    });

    if (rows.length == 0) {
      rows = React.createElement(this.props.noResultsComponent);
    }

    return (
      <div className="react-view">
        { error }
        { title }
        { filter }
        { rows }
        { pagination }
      </div>
    );
  }
})

module.exports = View;
