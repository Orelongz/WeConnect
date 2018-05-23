import {
  ADD_REVIEW,
  GET_BUSINESS_REVIEWS,
  EDIT_REVIEW,
  DELETE_REVIEW
} from './../types/Types';
import api from './../apiCalls/Api';

const addedReview = review => ({
  type: ADD_REVIEW,
  review
});

const addReview = (credentials, businessId, User) => dispatch => (
  api.review
    .addReview(credentials, businessId)
    .then((review) => {
      dispatch(addedReview({ ...review, User }));
    })
);

const businessReviews = reviews => ({
  type: GET_BUSINESS_REVIEWS,
  reviews
});

const getBusinessReviews = businessId => dispatch => (
  api.review
    .getBusinessReviews(businessId)
    .then((reviews) => {
      dispatch(businessReviews(reviews));
    })
);

const editedReview = review => ({
  type: EDIT_REVIEW,
  review
});

const editReview = (credentials, reviewId, firstname, lastname) => dispatch => (
  api.review
    .editReview(credentials, reviewId)
    .then((review) => {
      const User = { firstname, lastname };
      dispatch(editedReview({ ...review, User }));
    })
);

const deletedReview = reviewId => ({
  type: DELETE_REVIEW,
  reviewId
});

const deleteReview = reviewId => dispatch => (
  api.review
    .deleteReview(reviewId)
    .then(() => {
      dispatch(deletedReview(reviewId));
    })
);

export {
  addReview,
  getBusinessReviews,
  editReview,
  deleteReview
};
