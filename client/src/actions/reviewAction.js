import {
  ADD_REVIEW,
  GET_BUSINESS_REVIEWS
} from './../types/Types';
import api from './../apiCalls/Api';

const addedReview = review => ({
  type: ADD_REVIEW,
  review
});

const addReview = (credentials, businessId) => dispatch => (
  api.review
    .addReview(credentials, businessId)
    .then((review) => {
      dispatch(addedReview(review));
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

export {
  addReview,
  getBusinessReviews
};
