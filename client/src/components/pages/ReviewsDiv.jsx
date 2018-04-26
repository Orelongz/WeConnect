import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReviewForm from './../forms/ReviewForm';
import ReviewsList from './ReviewsList';

const propTypes = {
  postReview: PropTypes.func,
  businessReviews: PropTypes.array.isRequired,
  currentUser: PropTypes.string
}

class ReviewDiv extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  submit(data) {
    return this.props.postReview(data);
  }

  render() {
    const { currentUser, businessReviews } = this.props;
    
    return (
      <div className="card form-group mt-4">
        <div className="container pt-3">
          {
            currentUser ? (
              <div className="media">
                <img src="https://i.stack.imgur.com/34AD2.jpg" className="img-thumbnail rounded-circle small-profile-pic mr-3" />
                <ReviewForm submit={this.submit} />
              </div>
            ): null
          }
          <ReviewsList businessReviews={businessReviews} />
        </div>
      </div>
    );
  }
}

ReviewDiv.propTypes = propTypes;

export default ReviewDiv;