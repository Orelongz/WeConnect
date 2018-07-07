import {
  ADD_REVIEW,
  ADD_REVIEW_FAILED,
  GET_BUSINESS_REVIEWS,
  EDIT_REVIEW,
  EDIT_REVIEW_FAILED,
  DELETE_REVIEW,
  DELETE_REVIEW_FAILED,
  IS_REQUEST_LOADING
} from './../types/Types';
import api from './../apiCalls/Api';
import {
  isLoading,
  successfulRequest,
  failedRequest
} from './helpers';
import { handleErrorCatch } from './../utils';

/**
 * addReview()
 * @desc dispatches addedReview action
 * @param {Object} credentials
 * @param {String} businessId
 * @param {Object} User
 * @return {*} void
 */
const addReview = (credentials, businessId, User) => (dispatch) => {
  dispatch(isLoading(IS_REQUEST_LOADING, true));

  return api.review
    .addReview(credentials, businessId)
    .then((review) => {
      dispatch(successfulRequest(ADD_REVIEW, { ...review, User }));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
    })
    .catch((error) => {
      dispatch(failedRequest(ADD_REVIEW_FAILED, handleErrorCatch(error.response.data)));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
    });
};

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
      dispatch(successfulRequest(GET_BUSINESS_REVIEWS, reviews));
    })
);

/**
 * addReview()
 * @desc dispatches editedReview action
 * @param {Object} credentials
 * @param {String} reviewId
 * @param {Object} User
 * @return {*} void
 */
const editReview = (credentials, reviewId, User) => (dispatch) => {
  dispatch(isLoading(IS_REQUEST_LOADING, true));

  return api.review
    .editReview(credentials, reviewId)
    .then((review) => {
      dispatch(successfulRequest(EDIT_REVIEW, { ...review, User }));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
    })
    .catch((error) => {
      dispatch(failedRequest(EDIT_REVIEW_FAILED, handleErrorCatch(error.response.data)));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
    });
};

/**
 * deleteReview()
 * @desc dispatches deletedReview action
 * @param {String} reviewId
 * @return {*} void
 */
const deleteReview = reviewId => (dispatch) => {
  dispatch(isLoading(IS_REQUEST_LOADING, true));

  return api.review
    .deleteReview(reviewId)
    .then(() => {
      dispatch(successfulRequest(DELETE_REVIEW, reviewId));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
    })
    .catch((error) => {
      dispatch(failedRequest(DELETE_REVIEW_FAILED, handleErrorCatch(error.response.data)));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
    });
};

export {
  addReview,
  getBusinessReviews,
  editReview,
  deleteReview
};
