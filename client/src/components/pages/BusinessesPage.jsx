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
  componentDidMount() {
    this.props.allBusinesses();
  }

  render() {
    function displayBusinesses(businesses) {
      if (businesses.length === 0) {
        return <p>Sorry, there are presently no businesses</p>
      } else {
        return populateBusinesses(businesses)
      }
    }
    return (
      <Fragment>
        <SearchBar />
        <main className="pb-main">
          <div className="container">
            <h1 className="text-center">All Businesses</h1>
            <div className="row">
              {displayBusinesses(this.props.businesses)}
            </div>
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