// import required modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BusinessProfile from './BusinessProfile.jsx';
import {
  getBusiness,
  deleteBusiness,
  businessRating
} from './../../../actions/businessAction';
import {
  addReview,
  getBusinessReviews,
  editReview,
  deleteReview
} from './../../../actions/reviewAction';
import ReviewsDiv from './ReviewsDiv.jsx';

// define proptypes for BusinessProfilePage component
const propTypes = {
  getBusiness: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired,
  getBusinessReviews: PropTypes.func.isRequired,
  businessRating: PropTypes.func.isRequired,
  editReview: PropTypes.func,
  deleteReview: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      businessId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  User: PropTypes.object,
  businessReviews: PropTypes.array.isRequired,
  businessDetails: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

/**
 * @class BusinessProfilePage
 * @desc renders the BusinessProfilePage component
 * @return {*} void
 */
class BusinessProfilePage extends Component {
  /**
   * constructor
   * @desc constructor for the BusinessProfilePage component
   * @return {*} void
   */
  constructor() {
    super();
    this.handleBusinessDelete = this.handleBusinessDelete.bind(this);
    this.postReview = this.postReview.bind(this);
    this.handleEditReview = this.handleEditReview.bind(this);
    this.handleDeleteReview = this.handleDeleteReview.bind(this);
  }

  /**
   * componentDidMount
   * @desc react componentDidMount lifecycle
   * @return {Object} new state object
   */
  componentDidMount() {
    const { businessId } = this.props.match.params;
    this.props
      .getBusiness(businessId)
      .catch(() => this.props.history.push('/businesses'));
    this.props.businessRating(businessId);
    this.props.getBusinessReviews(businessId);
  }

  /**
   * handleBusinessDelete
   * @desc handles the deletion of a business
   * @return {*} void
   */
  handleBusinessDelete() {
    const { businessId } = this.props.match.params;
    return this.props
      .deleteBusiness(businessId)
      .then(() => this.props.history.push('/businesses'));
  }

  /**
   * postReview
   * @desc handles the posting of a review
   * @param {Object} data review object
   * @return {*} void
   */
  postReview(data) {
    const { businessId } = this.props.match.params;
    const { User } = this.props;

    return this.props
      .addReview(data, businessId, User)
      .then(() => this.props.businessRating(businessId));
  }

  /**
   * postReview
   * @desc handles the editing of a review
   * @param {Object} data review object
   * @param {String} reviewId
   * @return {*} void
   */
  handleEditReview(data, reviewId) {
    const { businessId } = this.props.match.params;
    const { firstname, lastname } = this.props.User;

    this.props.editReview(data, reviewId, firstname, lastname)
      .then(() => this.props.businessRating(businessId));
  }

  /**
   * postReview
   * @desc handles the deletion of a review
   * @param {String} reviewId
   * @return {*} void
   */
  handleDeleteReview(reviewId) {
    const { businessId } = this.props.match.params;

    this.props.deleteReview(reviewId)
      .then(() => this.props.businessRating(businessId));
  }

  /**
   * render
   * @desc renders the BusinessesPage component
   * @return {Object} the BusinessesPage component
   */
  render() {
    const { User, businessReviews, businessDetails } = this.props;

    return (
      <main className="pb-main">
        <div className="container">
          <div className="row">
            {
              businessDetails &&
              <BusinessProfile
                businessDetails={businessDetails}
                User={User}
                handleBusinessDelete={this.handleBusinessDelete}
              />
            }
            <div className="col-md-12 col-lg-4"></div>
            <div className="col-md-12 col-lg-8">
              {
                (businessReviews.length > 0 || !!User.id) &&
                <ReviewsDiv
                  postReview={this.postReview}
                  businessReviews={businessReviews}
                  User={User}
                  handleEditReview={this.handleEditReview}
                  handleDeleteReview={this.handleDeleteReview}
                />
              }
            </div>
          </div>
        </div>
      </main>
    );
  }
}

/**
 * mapStateToProps
 * @param {Object} state redux state
 * @return {Object} BusinessesPage props
 */
function mapStateToProps(state) {
  return {
    businessDetails: state.businessReducer.business,
    User: state.userReducer,
    businessReviews: state.reviewReducer.reviews
  };
}

BusinessProfilePage.propTypes = propTypes;

export default connect(mapStateToProps, {
  getBusiness,
  deleteBusiness,
  addReview,
  getBusinessReviews,
  editReview,
  deleteReview,
  businessRating
})(BusinessProfilePage);
