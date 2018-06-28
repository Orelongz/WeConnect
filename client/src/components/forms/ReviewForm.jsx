// import required modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';
import { validate } from './../../utils';
import InLineError from './../messages/InLineError.jsx';
import { defaultUserProfilePic } from './../../../public/images';

// define proptypes for ReviewForm component
const propTypes = {
  submit: PropTypes.func.isRequired,
  User: PropTypes.object
};

/**
 * @class ReviewForm
 * @desc renders the ReviewForm component
 * @return {*} void
 */
class ReviewForm extends Component {
  /**
   * constructor
   * @desc constructor for the ContactForm component
   * @return {*} void
   */
  constructor() {
    super();
    this.state = {
      review: '',
      rating: 0,
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.setRating = this.setRating.bind(this);
    this.submit = this.submit.bind(this);
  }

  /**
   * onSubmit
   * @desc handles submit of the review form
   * @param {Object} event DOM event
   * @return {func} submit
   */
  submit(event) {
    event.preventDefault();
    const { review, rating } = this.state;
    const error = validate({ review });

    if (rating === null) {
      error.rating = 'Rate the business';
    }
    this.setState({ error });

    if (Object.keys(error).length === 0) {
      this.props.submit({ review, rating });
      this.setState({ review: '', rating: 0 });
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
   * @desc sets the rating for a review
   * @param {Integer} rating business rating
   * @return {Object} new state object
   */
  setRating(rating) {
    this.setState({ rating });
  }

  /**
   * render
   * @desc renders the ReviewForm component
   * @return {Object} the ReviewForm component
   */
  render() {
    const { error } = this.state;
    const { User } = this.props;
    const displayImage = User.userImage !== '' ? User.userImage : defaultUserProfilePic;

    return (
      <div className="media">
        <img src={displayImage}className="img-thumbnail rounded-circle small-profile-pic mr-3" />
        <form className="media-body" onSubmit={this.submit}>
          <div>
            <label htmlFor="review">Write a review: </label>
            <textarea
              className="form-control"
              id="review"
              name="review"
              onChange={this.onChange}
              value={this.state.review}
            />
            {error.review && <InLineError text={error.review} />}
            {error.rating && <InLineError text={error.rating} />}
          </div>

          <div className="pt-3">
            <StarRatings
              name='rating'
              starDimension="20px"
              starSpacing="2px"
              starRatedColor="gold"
              starEmptyColor="gray"
              starHoverColor="gold"
              rating={this.state.rating}
              changeRating={this.setRating}
              numberOfStars={5}
            />
            <button type="submit" className="btn btn-primary btn-sm pull-right">POST</button>
          </div>
        </form>
      </div>
    );
  }
}

ReviewForm.propTypes = propTypes;

export default ReviewForm;
