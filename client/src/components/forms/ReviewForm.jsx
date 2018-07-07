// import required modules
import React from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';
import InLineError from './../messages/InLineError.jsx';

// define proptypes for ReviewForm component
const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  changeRating: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  displayUserImage: PropTypes.string.isRequired,
  reviewFormError: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  editing: PropTypes.string.isRequired
};

/**
 * ReviewForm
 * @desc renders the ReviewForm component
 * @return {*} void
 */
function ReviewForm({
  displayUserImage, changeRating, onChange, onSubmit,
  data, reviewFormError, isLoading, editing
}) {
  return (
    <div className="media">
      <img src={displayUserImage}className="img-thumbnail rounded-circle small-profile-pic mr-3" />
      <form className="media-body" onSubmit={onSubmit}>
        <div>
          <label htmlFor="review">Write a review: </label>
          <textarea
            className="form-control"
            id="review"
            name="review"
            onChange={onChange}
            value={data.review}
          />
          {!editing && reviewFormError && <InLineError text={reviewFormError} />}
        </div>

        <div className="pt-3">
          <StarRatings
            name='rating'
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="gold"
            starEmptyColor="gray"
            starHoverColor="gold"
            rating={data.rating}
            changeRating={changeRating}
            numberOfStars={5}
          />
          <button disabled={isLoading} type="submit" className="btn btn-primary btn-sm pull-right">POST</button>
        </div>
      </form>
    </div>
  );
}

ReviewForm.propTypes = propTypes;

export default ReviewForm;
