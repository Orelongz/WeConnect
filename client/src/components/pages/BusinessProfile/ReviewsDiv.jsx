// import required modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReviewForm from './../../forms/ReviewForm.jsx';
import ReviewsList from './ReviewsList.jsx';

// define proptypes for Rating component
const propTypes = {
  postReview: PropTypes.func,
  businessReviews: PropTypes.array.isRequired,
  User: PropTypes.object,
  handleEditReview: PropTypes.func,
  handleDeleteReview: PropTypes.func
};

/**
 * @class ReviewDiv
 * @desc renders the ReviewDiv component
 * @return {*} void
 */
class ReviewDiv extends Component {
  /**
   * constructor
   * @desc constructor for the BusinessProfilePage component
   * @return {*} void
   */
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.editReview = this.editReview.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
  }

  /**
   * submit
   * @desc handles submission on a review
   * @param {Object} data
   * @return {func} props
   */
  submit(data) {
    return this.props.postReview(data);
  }

  /**
   * editReview
   * @desc handles the editting of a review
   * @param {Object} data
   * @param {String} reviewId
   * @return {func} props
   */
  editReview(data, reviewId) {
    return this.props.handleEditReview(data, reviewId);
  }

  /**
   * deleteReview
   * @desc handles deletion on a review
   * @param {String} reviewId
   * @return {func} props
   */
  deleteReview(reviewId) {
    return this.props.handleDeleteReview(reviewId);
  }

  /**
   * render
   * @desc renders the ReviewDiv component
   * @return {Object} the ReviewDiv component
   */
  render() {
    const { User, businessReviews } = this.props;

    return (
      <div className="card form-group mt-4">
        <div className="container pt-3">
          { User.id && <ReviewForm submit={this.submit} User={User} /> }
          <ReviewsList
            businessReviews={businessReviews}
            User={User}
            editReview={this.editReview}
            deleteReview={this.deleteReview}
          />
        </div>
      </div>
    );
  }
}

ReviewDiv.propTypes = propTypes;

export default ReviewDiv;
