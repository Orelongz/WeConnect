// import required modules
import React from 'react';
import PropTypes from 'prop-types';
import ReviewForm from './../../forms/ReviewForm.jsx';
import ReviewsList from './ReviewsList.jsx';

// define proptypes for Rating component
const propTypes = {
  handleDeleteReview: PropTypes.func.isRequired,
  toggleEditing: PropTypes.func.isRequired,
  changeRating: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  User: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  update: PropTypes.object.isRequired,
  businessReviews: PropTypes.array.isRequired,
  reviewFormError: PropTypes.string.isRequired,
  displayUserImage: PropTypes.string.isRequired,
  editing: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

/**
 * ReviewsContainer()
 * @desc renders the ReviewsContainer component
 * @return {*} void
 */
function ReviewsContainer({
  User, businessReviews, onSubmit, editing, isLoading,
  displayUserImage, changeRating, onChange, data, update,
  reviewFormError, handleDeleteReview, toggleEditing
}) {
  return (
    <div className="card form-group mt-4">
      <div className="container pt-3">
        {
          User.id &&
          <ReviewForm
            reviewFormError={reviewFormError}
            displayUserImage={displayUserImage}
            changeRating={changeRating}
            isLoading={isLoading}
            onSubmit={onSubmit}
            onChange={onChange}
            editing={editing}
            data={data}
          />
        }
        <ReviewsList
          businessReviews={businessReviews}
          displayUserImage={displayUserImage}
          handleDeleteReview={handleDeleteReview}
          reviewFormError={reviewFormError}
          toggleEditing={toggleEditing}
          changeRating={changeRating}
          isLoading={isLoading}
          onSubmit={onSubmit}
          onChange={onChange}
          editing={editing}
          update={update}
          User={User}
        />
      </div>
    </div>
  );
}

ReviewsContainer.propTypes = propTypes;

export default ReviewsContainer;
