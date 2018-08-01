// import required modules
import React from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';
import InLineError from './../messages/InLineError.jsx';

// define proptypes for EditReviewForm component
const propTypes = {
  toggleEditing: PropTypes.func.isRequired,
  changeRating: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  update: PropTypes.object.isRequired,
  User: PropTypes.object.isRequired,
  reviewFormError: PropTypes.string.isRequired,
  displayImage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

/**
 * EditReviewForm()
 * @desc renders the EditReviewForm component
 * @return {*} void
 */
function EditReviewForm({
  reviewFormError, displayImage, changeRating, isLoading,
  onChange, onSubmit, update, User, toggleEditing
}) {
  return (
    <form className="media border-top pt-3 mt-3" onSubmit={onSubmit}>
      <img
        src={displayImage}
        className="img-thumbnail rounded-circle small-profile-pic mr-3"
      />
      <div className="media-body">
        <div className="d-flex justify-content-between pb-1">
          <h5>{User.firstname} {User.lastname}</h5>
          <StarRatings
            name='rating'
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="gold"
            starEmptyColor="gray"
            starHoverColor="gold"
            rating={update.rating}
            changeRating={changeRating}
            numberOfStars={5}
          />
          <span onClick={() => toggleEditing()} className="btn btn-danger btn-sm pull-right">Cancel</span>
          <button
            id="saveReview"
            disabled={isLoading}
            type="submit"
            className="btn btn-primary btn-sm pull-right"
          >
            Save
          </button>
        </div>
        <textarea
          className="form-control"
          id="reviewUpdate"
          name="review"
          onChange={onChange}
          value={update.review}
        />
        {reviewFormError && <InLineError text={reviewFormError} />}
      </div>
    </form>
  );
}

EditReviewForm.propTypes = propTypes;

export default EditReviewForm;
