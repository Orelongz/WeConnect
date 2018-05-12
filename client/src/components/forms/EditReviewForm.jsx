import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validate } from './../../utils';
import InLineError from './../messages/InLineError';
import Rating from './../pages/Rating';

const propTypes = {
  editReview: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired
}

class EditReviewForm extends Component {
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

  componentDidMount() {
    this.setState({
      reviewUpdate: this.props.review.review,
      rating: this.props.review.rating
    });
  }

  submit(e) {
    e.preventDefault();
    const { reviewUpdate, rating } = this.state;
    const error = validate({ reviewUpdate });

    this.setState({ error });
    const { review } = this.props;

    if (Object.keys(error).length === 0) {
      this.props.editReview({ review: reviewUpdate, rating }, review.id);
    }
  }

  onChange(e) {
    return this.setState({
      [e.target.name]: e.target.value
    });
  }

  setRating(rating) {
    this.setState({ rating });
  }

  render() {
    const { error } = this.state;
    const { review } = this.props;
    return (
      <form className="media border-top pt-3 mt-3" onSubmit={this.submit}>
        <img
          src="https://i.stack.imgur.com/34AD2.jpg"
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
