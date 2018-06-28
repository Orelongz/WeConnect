// import required modules
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './../../forms/SearchBar.jsx';
import { allBusinesses } from './../../../actions/businessAction';
import { defaultBusinessProfilePic } from './../../../../public/images';
import Paginate from './../../../utils/paginate.jsx';

// define proptypes for BusinessesPage component
const propTypes = {
  allBusinesses: PropTypes.func.isRequired,
  businesses: PropTypes.array.isRequired,
  paginate: PropTypes.object.isRequired
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
            const displayImage = businessImage === '' || businessImage === null ? defaultBusinessProfilePic : businessImage;

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
      currentPage: 1,
      searchTerm: '',
      pageSize: 0,
      count: 0,
      limit: 0
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * onChange
   * @desc handles change in businesses page
   * @param {Number} page the page number for businesses
   * @return {Object} new state object
   */
  onChange(page) {
    // get the searchTerm from the components state
    const { searchTerm } = this.state;
    const generatePage = `page=${page}`;

    if (searchTerm !== '') {
      // call api to fetch businesses by searchTerm and page number
      this.props.allBusinesses(searchTerm, generatePage);
    } else {
      // call api to fetch businesses just by the page number
      this.props.allBusinesses(null, generatePage);
    }

    // set currentPage to value of page
    this.setState({ currentPage: page });
  }

  /**
   * handleSearch
   * @desc handles business search
   * @param {String} searchTerm the page number for businesses
   * @return {Object} new state object
   */
  handleSearch(searchTerm) {
    this.setState({ searchTerm, currentPage: 1 });
    this.props.allBusinesses(searchTerm)
      .then(() => {
        const { count, limit, pageSize } = this.props.paginate;
        this.setState({ count, limit, pageSize });
      });
  }

  /**
   * componentDidMount
   * @desc react componentDidMount lifecycle
   * @return {Object} new state object
   */
  componentDidMount() {
    // set documet title
    document.title = 'Businesses';

    // call action to retrieve all businesses
    this.props.allBusinesses()
      .then(() => {
        const { count, limit, pageSize } = this.props.paginate;
        this.setState({ count, limit, pageSize });
      });
  }

  /**
   * render
   * @desc renders the BusinessesPage component
   * @return {Object} the BusinessesPage component
   */
  render() {
    const {
      currentPage, pageSize, count, limit
    } = this.state;

    return (
      <Fragment>
        <SearchBar handleSearch={this.handleSearch} />
        <main className="pb-main">
          <div className="container">
            {displayBusinesses(this.props.businesses)}

            {/* only show pagination bar if businesses is greater than set limit */}
            {
              count > limit &&
              <div className="d-flex justify-content-center mt-5">
                <Paginate
                  total={count}
                  pageSize={pageSize}
                  current={currentPage}
                  onChange={this.onChange}
                />
              </div>
            }
          </div>
        </main>
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
    businesses: state.businessReducer.businesses,
    paginate: state.businessReducer.paginate
  };
}

export default connect(mapStateToProps, { allBusinesses })(BusinessesPage);
