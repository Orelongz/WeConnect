import {
  ADD_REVIEW,
  ADD_REVIEW_FAILED,
  GET_BUSINESS_REVIEWS,
  EDIT_REVIEW,
  EDIT_REVIEW_FAILED,
  DELETE_REVIEW,
  DELETE_REVIEW_FAILED
} from './../types/Types';

const initialState = {
  reviews: [],
  error: null
};

/**
 * reviewReducer()
 * @desc reducer for reviews
 * @param {Object} state
 * @param {Object} action
 * @return {Object} state
 */
function reviewReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_REVIEW:
      return {
        ...state,
        error: null,
        reviews: [action.credentials, ...state.reviews]
      };
    case ADD_REVIEW_FAILED:
    case EDIT_REVIEW_FAILED:
    case DELETE_REVIEW_FAILED:
      return {
        ...state,
        error: action.error
      };
    case GET_BUSINESS_REVIEWS:
      return {
        ...state,
        reviews: action.credentials,
      };
    case EDIT_REVIEW: {
      const newReviewList = state.reviews.map((eachReview) => {
        if (eachReview.id === action.credentials.id) return action.credentials;
        return eachReview;
      });
      return {
        ...state,
        error: null,
        reviews: newReviewList
      };
    }
    case DELETE_REVIEW:
      return {
        ...state,
        error: null,
        reviews: state.reviews.filter(review => review.id !== action.credentials)
      };
    default:
      return state;
  }
}

export default reviewReducer;
