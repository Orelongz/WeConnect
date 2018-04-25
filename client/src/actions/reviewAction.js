import { ADD_REVIEW } from './../types/Types';
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

export { addReview };
