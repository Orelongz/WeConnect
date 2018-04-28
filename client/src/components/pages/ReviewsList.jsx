import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import EditReviewForm from './../forms/EditReviewForm';

const propTypes = {
  businessReviews: PropTypes.array.isRequired,
  editReview: PropTypes.func,
  deleteReview: PropTypes.func,
  currentUser: PropTypes.string
}

class ReviewList extends Component {
  constructor() {
    super();
    this.state = {
      editing: null
    };
    this.editReview = this.editReview.bind(this);
  }

  toggleEditing(reviewId) {
    this.setState({
      editing: reviewId
    });
  }

  editReview(data, reviewId) {
    this.props.editReview(data, reviewId);
    this.setState({
      editing: null
    });
  }

  renderReviewOrEditField(review) {
    const { currentUser } = this.props;
    if (this.state.editing === review.id) {
      return (
        <EditReviewForm
          review={review}
          key={review.id}
          editReview={this.editReview}
        />
      );
    }
    return (
      <li
        className="media border-top pt-3 mt-3"
        key={review.id}
      >
        <img
          src="https://i.stack.imgur.com/34AD2.jpg"
          className="img-thumbnail rounded-circle small-profile-pic mr-3"
        />
        <div className="media-body">
          <div className="d-flex justify-content-between">
            <h5>{review.User.firstname} {review.User.lastname}</h5>
            <div>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star-o"></span>
            </div>
            <div>
              {review.updatedAt.split('T')[0]}
            </div>
            {
              currentUser === review.userId ? (
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