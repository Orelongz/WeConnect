import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReviewForm from './../forms/ReviewForm';
import ReviewsList from './ReviewsList';

const propTypes = {
  postReview: PropTypes.func,
  businessReviews: PropTypes.array.isRequired,
  User: PropTypes.object,
  handleEditReview: PropTypes.func,
  handleDeleteReview: PropTypes.func
}

class ReviewDiv extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.editReview = this.editReview.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
  }

  submit(data) {
    return this.props.postReview(data);
  }

  editReview(data, reviewId) {
    return this.props.handleEditReview(data, reviewId);
  }

  deleteReview(reviewId) {
    return this.props.handleDeleteReview(reviewId);
  }

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