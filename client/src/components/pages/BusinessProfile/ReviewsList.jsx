// import required modules
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';
import EditReviewForm from './../../forms/EditReviewForm.jsx';
import { defaultUserProfilePic } from './../../../../public/images';

// define proptypes for Rating component
const propTypes = {
  businessReviews: PropTypes.array.isRequired,
  editReview: PropTypes.func,
  deleteReview: PropTypes.func,
  User: PropTypes.object
};

/**
 * @class ReviewList
 * @desc renders the ReviewList component
 * @return {*} void
 */
class ReviewList extends Component {
  /**
   * constructor
   * @desc constructor for the BusinessProfilePage component
   * @return {*} void
   */
  constructor() {
    super();
    this.state = {
      editing: null
    };
    this.editReview = this.editReview.bind(this);
  }

  /**
   * toggleEditing
   * @desc switching between reviews to display and edit
   * @param {String} reviewId
   * @return {Object} a new state
   */
  toggleEditing(reviewId) {
    this.setState({
      editing: reviewId
    });
  }

  /**
   * editReview
   * @desc handle editting of a review
   * @param {String} data
   * @param {Object} reviewId
   * @return {Object} a new state
   */
  editReview(data, reviewId) {
    this.props.editReview(data, reviewId);
    this.setState({
      editing: null
    });
  }

  /**
   * renderReviewOrEditField
   * @desc seletively renders reviews or editreview component
   * @param {Object} review
   * @return {*} void
   */
  renderReviewOrEditField(review) {
    const { User } = this.props;
    const displayImage = review.User.userImage !== '' ? review.User.userImage : defaultUserProfilePic;

    if (this.state.editing === review.id) {
      return (
        <EditReviewForm
          review={review}
          key={review.id}
          editReview={this.editReview}
          displayImage={displayImage}
        />
      );
    }
    return (
      <li
        className="media border-top pt-3 mt-3"
        key={review.id}
      >
        <img
          src={displayImage}
          className="img-thumbnail rounded-circle small-profile-pic mr-3"
        />
        <div className="media-body">
          <div className="d-flex justify-content-between">
            <h5>{review.User.firstname} {review.User.lastname}</h5>
            <StarRatings
              rating={review.rating}
              starDimension="20px"
              starSpacing=""
              starRatedColor="gold"
            />
            <div>
              {review.updatedAt.split('T')[0]}
            </div>
            {
              User.id === review.userId ? (
                <Fragment>
                  <div
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Edit"
                    onClick={this.toggleEditing.bind(this, review.id)}
                  >
                    <i className="fa fa-pencil-square-o text-primary"></i>
                  </div>
                  <div
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete"
                    onClick={() => this.props.deleteReview(review.id)}
                  >
                    <i className="fa fa-trash text-danger"></i>
                  </div>
                </Fragment>
              ) : null
            }
          </div>
          <p>{review.review}</p>
        </div>
      </li>
    );
  }

  /**
   * render
   * @desc renders the ReviewsList component
   * @return {Object} the ReviewsList component
   */
  render() {
    const { businessReviews } = this.props;

    return (
      <ul className="list-unstyled">
        {
          businessReviews.length > 0 ? (
            businessReviews.map(review => (
              this.renderReviewOrEditField(review)
            ))
          ) : null
        }
      </ul>
    );
  }
}

ReviewList.propTypes = propTypes;

export default ReviewList;
