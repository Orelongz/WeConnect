import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validate } from './../../utils';
import InLineError from './../messages/InLineError';
import Rating from './../pages/Rating';

const propTypes = {
  submit: PropTypes.func.isRequired
}

class ReviewForm extends Component {
  constructor() {
    super();
    this.state = {
      review: '',
      rating: null,
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.setRating = this.setRating.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const { review, rating } = this.state;
    const error = validate({ review });

    if (rating === null) {
      error.rating = 'Rate the business';
    }
    this.setState({ error });

    if (Object.keys(error).length === 0) {
      this.props.submit({ review, rating });
      this.setState({ review: ''});
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
    return (
      <div className="media">
        <img src="https://i.stack.imgur.com/34AD2.jpg" className="img-thumbnail rounded-circle small-profile-pic mr-3" />
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
            <Rating setRating={this.setRating} />
            <button type="submit" className="btn btn-primary btn-sm pull-right">POST</button>
          </div>
        </form>
      </div>
    );
  }
}

ReviewForm.propTypes = propTypes;

export default ReviewForm;
