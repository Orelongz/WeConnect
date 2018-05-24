import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { allBusinesses } from './../../actions/businessAction';
import { defaultBusinessProfilePic } from './../../../public/images';
import Paginate from './../../utils/paginate';

const propTypes = {
  allBusinesses: PropTypes.func.isRequired,
  businesses: PropTypes.array.isRequired
};

class BusinessesPage extends Component {
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

  onChange(page) {
    const { searchTerm } = this.state;
    const generatePage = `page=${page}`;
    if (searchTerm !== '') {
      this.props.allBusinesses(searchTerm, generatePage);
    } else {
      this.props.allBusinesses(null, generatePage);
    }
    
    this.setState({ currentPage: page });
  }

  handleSearch(searchTerm) {
    this.setState({ searchTerm, currentPage: 1 });
    this.props.allBusinesses(searchTerm)
      .then(() => {
        const { count, limit, pageSize } = this.props.paginate;
        this.setState({ count, limit, pageSize });
      });
  }

  componentDidMount() {
    this.props.allBusinesses()
      .then(() => {
        const { count, limit, pageSize } = this.props.paginate;
        this.setState({ count, limit, pageSize });
      });
  }

  displayBusinesses(businesses) {
    if (businesses.length === 0) {
      return <h1 className="text-center">No Businesses Yet</h1>
    } else {
      return (
        <Fragment>
          <h1 className="text-center">Businesses</h1>
          <div className="row">
            {
              businesses.map((eachBusiness) => {
                const { businessImage, businessName, category, phoneNumber, id: businessId } = eachBusiness;
                const businessLink = `/businesses/${businessId}`;
                const displayImage = (businessImage === '' || businessImage === null ? defaultBusinessProfilePic: businessImage);
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
                )
              })
            }
          </div>
        </Fragment>
      );
    }
  }

  render() {
    const { currentPage, pageSize, count, limit } = this.state;

    return (
      <Fragment>
        <SearchBar handleSearch={this.handleSearch} />
        <main className="pb-main">
          <div className="container">
            {this.displayBusinesses(this.props.businesses)}
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

function mapStateToProps(state) {
  return {
    businesses: state.businessReducer.businesses,
    paginate: state.businessReducer.paginate
  };
}

export default connect(mapStateToProps, { allBusinesses })(BusinessesPage);