// import required modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import BusinessProfile from './BusinessProfile.jsx';
import ReviewsContainer from './ReviewsContainer.jsx';
import InfoMessage from './../../messages/InfoMessage.jsx';

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
  isRequestLoading: PropTypes.bool.isRequired,
  isPageLoading: PropTypes.bool.isRequired,
  displayError: PropTypes.string
};

/**
 * @class BusinessProfilePage
 * @desc renders the BusinessProfilePage component
 * @return {*} void
 */
export class BusinessProfilePage extends Component {
  /**
   * constructor
   * @desc constructor for the BusinessProfilePage component
   * @return {*} void
   */
  constructor() {
    super();
    this.state = {
      data: {
        review: '',
        rating: 0
      },
      update: {
        review: '',
        rating: 0
      },
      reviewFormError: '',
      editing: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.handleDeleteBusiness = this.handleDeleteBusiness.bind(this);
    this.handleDeleteReview = this.handleDeleteReview.bind(this);
  }

  /**
   * componentDidMount
   * @desc react componentDidMount lifecycle
   * @return {Object} new state object
   */
  componentDidMount() {
    const { businessId } = this.props.match.params;
    this.props.getBusiness(businessId, this.props);
    this.props.businessRating(businessId);
    this.props.getBusinessReviews(businessId);
  }

  /**
   * handleDeleteBusiness
   * @desc handles the deletion of a business
   * @return {*} void
   */
  handleDeleteBusiness() {
    const { businessId } = this.props.match.params;
    this.props.deleteBusiness(businessId, this.props);
  }

  /**
   * handleDeleteReview
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
   * onSubmit
   * @desc handles creaton and editing of a review
   * @param {Object} event DOM event
   * @return {func} submit
   */
  onSubmit(event) {
    event.preventDefault();
    const { data, update, editing: reviewId } = this.state;

    if ((data.rating && data.review) || (update.rating && update.review)) {
      this.setState({ reviewFormError: '' });
      const { businessId } = this.props.match.params;
      const { User } = this.props;

      if (!reviewId) {
        this.props.addReview(data, businessId, User)
          .then(() => this.props.businessRating(businessId));
        this.setState({ data: { review: '', rating: 0 } });
      } else {
        this.props.editReview(update, reviewId, User)
          .then(() => this.props.businessRating(businessId));
        this.setState({ editing: '', data: { review: '', rating: 0 } });
      }
    } else {
      this.setState({
        reviewFormError: 'Kindly make sure you write a review and rate the business'
      });
    }
  }

  /**
   * onChange
   * @desc handles state change when value of input fields change
   * @param {Object} event DOM event
   * @return {func} new state object
   */
  onChange(event) {
    const { editing: reviewId } = this.state;
    if (!reviewId) {
      this.setState({
        data: { ...this.state.data, [event.target.name]: event.target.value }
      });
    } else {
      this.setState({
        update: { ...this.state.update, [event.target.name]: event.target.value }
      });
    }
  }

  /**
   * changeRating
   * @desc sets the rating for a review
   * @param {Integer} rating business rating
   * @return {Object} new state object
   */
  changeRating(rating) {
    const { editing: reviewId } = this.state;
    if (!reviewId) {
      this.setState({ data: { ...this.state.data, rating } });
    } else {
      this.setState({ update: { ...this.state.update, rating } });
    }
  }

  /**
   * toggleEditing
   * @desc switching between reviews to display and edit
   * @param {Object} review
   * @return {Object} a new state
   */
  toggleEditing(review) {
    if (review) {
      this.setState({
        update: { review: review.review, rating: review.rating },
        reviewFormError: '',
        editing: review.id
      });
    } else {
      this.setState({ editing: '', reviewFormError: '' });
    }
  }

  /**
   * render
   * @desc renders the BusinessesPage component
   * @return {Object} the BusinessesPage component
   */
  render() {
    const {
      User, businessReviews, businessDetails, isRequestLoading,
      isPageLoading, displayError
    } = this.props;
    const {
      data, update, reviewFormError, editing
    } = this.state;
    const displayUserImage = User.userImage || '/images/default_user_profile_pic.jpg';

    return (
      <main className="pb-main">
        {
          isPageLoading ?
          (
            <div className="loading">
              <img src="/images/page spinner.gif" alt="isLoading" />
              <p>Loading...</p>
            </div>
          ) :
          (
            <div className="container">
              {displayError && <InfoMessage text={displayError} type="danger" />}
              <div className="row">
                {
                  businessDetails &&
                  <BusinessProfile
                    businessDetails={businessDetails}
                    User={User}
                    handleDeleteBusiness={this.handleDeleteBusiness}
                    isLoading={isRequestLoading}
                  />
                }
                <div className="col-md-12 col-lg-4"></div>
                <div className="col-md-12 col-lg-8">
                  {
                    (businessReviews.length > 0 || !!User.id) &&
                    <ReviewsContainer
                      User={User}
                      onSubmit={this.onSubmit}
                      businessReviews={businessReviews}
                      toggleEditing={this.toggleEditing}
                      handleEditReview={this.handleEditReview}
                      handleDeleteReview={this.handleDeleteReview}
                      displayUserImage={displayUserImage}
                      reviewFormError={reviewFormError}
                      changeRating={this.changeRating}
                      isLoading={isRequestLoading}
                      onChange={this.onChange}
                      editing={editing}
                      data={data}
                      update={update}
                    />
                  }
                </div>
              </div>
            </div>
          )
        }
      </main>
    );
  }
}

/**
 * mapStateToProps
 * @param {Object} state redux state
 * @return {Object} BusinessesPage props
 */
const mapStateToProps = state => ({
  businessDetails: state.businessReducer.business,
  User: state.userReducer,
  businessReviews: state.reviewReducer.reviews,
  isRequestLoading: state.loadingReducer.isRequestLoading,
  isPageLoading: state.loadingReducer.isPageLoading,
  displayError: state.businessReducer.error
});

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
