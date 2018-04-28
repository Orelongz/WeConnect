import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import { allBusinesses } from './../../actions/businessAction';
import { populateBusinesses } from './../../utils/businessUtils';

const propTypes = {
  allBusinesses: PropTypes.func.isRequired,
  businesses: PropTypes.array.isRequired
};

class BusinessesPage extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(str) {
    this.props.allBusinesses(str);
  }

  componentDidMount() {
    this.props.allBusinesses();
  }

  render() {
    function displayBusinesses(businesses) {
      if (businesses.length === 0) {
        return <h1 className="text-center">No Businesses Yet</h1>
      } else {
        return (
          <Fragment>
            <h1 className="text-center">Businesses</h1>
            <div className="row">
              {populateBusinesses(businesses)}
            </div>
          </Fragment>
        );
      }
    }
    return (
      <Fragment>
        <SearchBar handleSearch={this.handleSearch} />
        <main className="pb-main">
          <div className="container">
            {displayBusinesses(this.props.businesses)}
          </div>
        </main>
      </Fragment>
    );
  }
}

BusinessesPage.propTypes = propTypes;

function mapStateToProps(state) {
  return { businesses: state.businessReducer.businesses };
}

export default connect(mapStateToProps, { allBusinesses })(BusinessesPage);