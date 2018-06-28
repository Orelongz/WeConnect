import {
  ADD_REVIEW,
  GET_BUSINESS_REVIEWS,
  EDIT_REVIEW,
  DELETE_REVIEW
} from './../types/Types';
import api from './../apiCalls/Api';

/**
 * addedReview()
 * @desc addedReview action
 * @param {Object} review
 * @return {Object} addedReview action
 */
const addedReview = review => ({
  type: ADD_REVIEW,
  review
});

/**
 * addReview()
 * @desc dispatches addedReview action
 * @param {Object} credentials
 * @param {String} businessId
 * @param {Object} User
 * @return {*} void
 */
const addReview = (credentials, businessId, User) => dispatch => (
  api.review
    .addReview(credentials, businessId)
    .then((review) => {
      dispatch(addedReview({ ...review, User }));
    })
);

/**
 * businessReviews()
 * @desc businessReviews action
 * @param {Object} reviews
 * @return {Object} businessReviews action
 */
const businessReviews = reviews => ({
  type: GET_BUSINESS_REVIEWS,
  reviews
});

/**
 * getBusinessReviews()
 * @desc dispatches businessReviews action
 * @param {String} businessId
 * @return {*} void
 */
const getBusinessReviews = businessId => dispatch => (
  api.review
    .getBusinessReviews(businessId)
    .then((reviews) => {
      dispatch(businessReviews(reviews));
    })
);

/**
 * editedReview()
 * @desc editedReview action
 * @param {Object} review
 * @return {Object} editedReview action
 */
const editedReview = review => ({
  type: EDIT_REVIEW,
  review
});

/**
 * addReview()
 * @desc dispatches editedReview action
 * @param {Object} credentials
 * @param {String} reviewId
 * @param {String} firstname
 * @param {String} lastname
 * @param {String} userImage
 * @return {*} void
 */
const editReview = (credentials, reviewId, firstname, lastname, userImage) => dispatch => (
  api.review
    .editReview(credentials, reviewId)
    .then((review) => {
      const User = { firstname, lastname, userImage };
      dispatch(editedReview({ ...review, User }));
    })
);

/**
 * deletedReview()
 * @desc deletedReview action
 * @param {Object} reviewId
 * @return {Object} deletedReview action
 */
const deletedReview = reviewId => ({
  type: DELETE_REVIEW,
  reviewId
});

/**
 * deleteReview()
 * @desc dispatches deletedReview action
 * @param {String} reviewId
 * @return {*} void
 */
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
