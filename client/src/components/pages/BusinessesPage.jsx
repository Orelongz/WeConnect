import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import { allBusinesses } from './../../actions/businessAction';
import { populateBusinesses } from './../../helpers/businessFormHelper';
import { handleErrorCatch } from './../../helpers';


const propTypes = {
  allBusinesses: PropTypes.func.isRequired,
  businesses: PropTypes.array
};

class BusinessesPage extends Component {
  constructor() {
    super();
    this.state = {
      error: {},
      businesses: []
    };
  }

  componentDidMount() {
    return this.props
      .allBusinesses()
      .then(() => {
        const { businesses } = this.props;
        this.setState({
          businesses: [...businesses]
        })
      });
  }

  render() {
    const { businesses } = this.state;
    console.log(businesses)
    return (
      <Fragment>
        <SearchBar />
        <main className="pb-main">
          <div className="container">
            <h1 className="text-center">All Businesses</h1>
            <div className="row">
              {populateBusinesses(businesses)}
            </div>
          </div>
        </main>
      </Fragment>
    );
  }
}

BusinessesPage.propTypes = propTypes;

function mapStateToProps(state) {
  console.log(state.business)
  if (state.business.businesses) {
    return { businesses: state.business.businesses };
  }
  return {};
}

export default connect(mapStateToProps, { allBusinesses })(BusinessesPage);