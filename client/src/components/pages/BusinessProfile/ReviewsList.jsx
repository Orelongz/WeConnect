// import required modules
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';
import EditReviewForm from './../../forms/EditReviewForm.jsx';
import { defaultUserProfilePic } from './../../../../public/images';
// define proptypes for Rating component
const propTypes = {
  handleDeleteReview: PropTypes.func.isRequired,
  toggleEditing: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  changeRating: PropTypes.func.isRequired,
  User: PropTypes.object.isRequired,
  update: PropTypes.object.isRequired,
  businessReviews: PropTypes.array.isRequired,
  reviewFormError: PropTypes.string.isRequired,
  displayUserImage: PropTypes.string.isRequired,
  editing: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

/**
 * @class ReviewList
 * @desc renders the ReviewList component
 * @return {*} void
 */
function ReviewList({
  businessReviews, handleDeleteReview, reviewFormError,
  onSubmit, onChange, editing, User, changeRating, update,
  toggleEditing, isLoading
}) {
  return (
    <ul className="list-unstyled">
      {
        businessReviews.length > 0 ? (
          businessReviews.map((review) => {
            const displayImage = review.User.userImage || defaultUserProfilePic;

            if (editing === review.id) {
              return (
                <EditReviewForm
                  reviewFormError={reviewFormError}
                  toggleEditing={toggleEditing}
                  displayImage={displayImage}
                  changeRating={changeRating}
                  isLoading={isLoading}
                  onSubmit={onSubmit}
                  onChange={onChange}
                  key={review.id}
                  update={update}
                  User={User}
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
                            onClick={() => toggleEditing(review)}
                          >
                            <i className="fa fa-pencil-square-o text-primary"></i>
                          </div>
                          <div
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                            onClick={() => handleDeleteReview(review.id)}
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
          })
        ) : null
      }
    </ul>
  );
}

ReviewList.propTypes = propTypes;

export default ReviewList;
