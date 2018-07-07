// import required modules
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import queryString from 'query-string';
import SearchBar from './../../forms/SearchBar.jsx';
import { allBusinesses } from './../../../actions/businessAction';
import {
  defaultBusinessProfilePic,
  pageSpinner
} from './../../../../public/images';
import Paginate from '../../../components/common/paginate.jsx';
import InfoMessage from './../../messages/InfoMessage.jsx';

// define proptypes for BusinessesPage component
const propTypes = {
  allBusinesses: PropTypes.func.isRequired,
  businesses: PropTypes.array.isRequired,
  paginate: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  displayError: PropTypes.string
};

/**
 * displayBusinesses
 * @desc selectively render businesses if it exists
 * @param {Object} businesses array of businesses
 * @return {Object} rendered businesses
 */
const displayBusinesses = (businesses) => {
  if (businesses.length === 0) {
    return (<h1 className="text-center">No Businesses Yet</h1>);
  }

  return (
    <Fragment>
      <h1 className="text-center">Businesses</h1>
      <div className="row">
        {
          businesses.map((eachBusiness) => {
            const {
              businessImage, businessName, category, phoneNumber, id: businessId
            } = eachBusiness;
            const businessLink = `/businesses/${businessId}`;
            const displayImage = businessImage || defaultBusinessProfilePic;

            return (
              <div key={businessId} className="col-xs-12 col-sm-6 col-lg-4 mt-4">
                <div className="card" >
                  <Link to={businessLink} className="overflow">
                    <img src={displayImage} alt={businessName} className="card-img-top catalog-profile-pic" />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{businessName}</h5>
                    <div className="card-text small">
                      <p className="mb-0">Category: {category}</p>
                      <p className="mb-0">Tel: {phoneNumber}</p>
                    </div>
                    <Link to={businessLink} className="btn btn-primary btn-sm">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </Fragment>
  );
};

/**
 * @class BusinessesPage
 * @desc renders the BusinessesPage component
 * @return {*} void
 */
class BusinessesPage extends Component {
  /**
   * constructor
   * @desc constructor for the BusinessesPage component
   * @return {*} void
   */
  constructor() {
    super();
    this.state = {
      search: '',
      value: 'name'
    };
    this.onChange = this.onChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  /**
   * onPageChange
   * @desc handles change in businesses page
   * @param {Number} page the page number for businesses
   * @return {Object} new state object
   */
  onPageChange(page) {
    // get the searchTerm from the components state
    const { search } = this.state;
    const generatePage = `page=${page}`;

    if (search) {
      // call api to fetch businesses by searchTerm and page number
      this.props.allBusinesses(search, generatePage);
    } else {
      // call api to fetch businesses just by the page number
      this.props.allBusinesses(null, generatePage);
    }
  }

  /**
   * handleSearch
   * @desc handles business search
   * @param {Object} event DOM event
   * @return {Object} new state object
   */
  handleSearch(event) {
    event.preventDefault();
    const { value, search } = this.state;
    if (search.trim() !== '') {
      this.props.allBusinesses(`${value}=${search}`);
    }
  }

  /**
   * componentDidMount
   * @desc react componentDidMount lifecycle
   * @return {Object} new state object
   */
  componentDidMount() {
    this.props.allBusinesses();
  }

  /**
   * onChange
   * @desc handles state change when value of input fields change
   * @param {Object} event DOM event
   * @return {Object} new state object
   */
  onChange(event) {
    return this.setState({
      ...this.state, [event.target.name]: event.target.value
    });
  }

  /**
   * render
   * @desc renders the BusinessesPage component
   * @return {Object} the BusinessesPage component
   */
  render() {
    const {
      isLoading, paginate, displayError, businesses
    } = this.props;
    const { currentPage, count, limit } = paginate;
    const data = this.state;

    return (
      <Fragment>
        <SearchBar
          handleSearch={this.handleSearch}
          onChange={this.onChange}
          data={data}
        />
        {
          isLoading ?
          (
            <div className="loading">
              <img src={pageSpinner} alt="isLoading" />
              <p>Loading...</p>
            </div>
          ) :
          (
            <main className="pb-main">
              {displayError && <InfoMessage text={displayError} type="danger" />}
              <div className="container">
                {displayBusinesses(businesses)}

                {/* only show pagination bar if businesses is greater than set limit */}
                {
                  count > limit &&
                  <div className="d-flex justify-content-center mt-5">
                    <Paginate
                      count={count}
                      pageSize={limit}
                      current={currentPage}
                      onChange={this.onPageChange}
                    />
                  </div>
                }
              </div>
            </main>
          )
        }
      </Fragment>
    );
  }
}

BusinessesPage.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state redux state
 * @return {Object} BusinessesPage props
 */
function mapStateToProps(state) {
  return {
    isLoading: state.loadingReducer.isPageLoading,
    businesses: state.businessReducer.businesses,
    paginate: state.businessReducer.paginate,
    displayError: state.businessReducer.error
  };
}

export default connect(mapStateToProps, { allBusinesses })(BusinessesPage);
