// import required modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validate } from './../../utils';
import InLineError from './../messages/InLineError.jsx';
import Rating from './../pages/BusinessProfile/Rating.jsx';
import { defaultUserProfilePic } from './../../../public/images';

// define proptypes for EditReviewForm component
const propTypes = {
  editReview: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired
};

/**
 * @class EditReviewForm
 * @desc renders the EditReviewForm component
 * @return {*} void
 */
class EditReviewForm extends Component {
  /**
   * constructor
   * @desc constructor for the ContactForm component
   * @return {*} void
   */
  constructor() {
    super();
    this.state = {
      reviewUpdate: '',
      rating: null,
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
    this.setRating = this.setRating.bind(this);
  }

  /**
   * componentDidMount
   * @desc react componentDidMount lifecycle
   * @return {Object} new state object
   */
  componentDidMount() {
    this.setState({
      reviewUpdate: this.props.review.review,
      rating: this.props.review.rating
    });
  }

  /**
   * onSubmit
   * @desc handles submit of the contact form
   * @param {Object} event DOM event
   * @return {func} submit
   */
  submit(event) {
    event.preventDefault();
    const { reviewUpdate, rating } = this.state;
    const error = validate({ reviewUpdate });

    this.setState({ error });
    const { review } = this.props;

    if (Object.keys(error).length === 0) {
      this.props.editReview({ review: reviewUpdate, rating }, review.id);
    }
  }

  /**
   * onChange
   * @desc handles state change when value of input fields change
   * @param {Object} event DOM event
   * @return {func} new state object
   */
  onChange(event) {
    return this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * setRating
   * @desc edit the rating for a review
   * @param {Integer} rating business rating
   * @return {Object} new state object
   */
  setRating(rating) {
    this.setState({ rating });
  }

  /**
   * render
   * @desc renders the EditReviewForm component
   * @return {Object} the EditReviewForm component
   */
  render() {
    const { error } = this.state;
    const { review } = this.props;
    const displayImage = review.User.userImage !== '' ? review.User.userImage : defaultUserProfilePic;

    return (
      <form className="media border-top pt-3 mt-3" onSubmit={this.submit}>
        <img
          src={displayImage}
          className="img-thumbnail rounded-circle small-profile-pic mr-3"
        />
        <div className="media-body">
          <div className="d-flex justify-content-between pb-1">
            <h5>{review.User.firstname} {review.User.lastname}</h5>
            <Rating setRating={this.setRating} rating={review.rating}/>
            <button type="submit" className="btn btn-primary btn-sm pull-right">POST</button>
          </div>
          <textarea
            className="form-control"
            id="reviewUpdate"
            name="reviewUpdate"
            onChange={this.onChange}
            value={this.state.reviewUpdate}
          />
          {error.reviewUpdate && <InLineError text={error.reviewUpdate} />}
        </div>
      </form>
    );
  }
}

EditReviewForm.propTypes = propTypes;

export default EditReviewForm;
