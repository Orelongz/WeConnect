import {
  ADD_REVIEW,
  GET_BUSINESS_REVIEWS,
  // GET_REVIEW,
  EDIT_REVIEW,
  DELETE_REVIEW
} from './../types/Types';

const initialState = {
  review: {},
  reviews: []
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
        review: action.review,
        reviews: [...state.reviews, action.review]
      };
    case GET_BUSINESS_REVIEWS:
      return {
        ...state,
        reviews: action.reviews
      };
    case EDIT_REVIEW: {
      const newReviewList = state.reviews.map((eachReview) => {
        if (eachReview.id === action.review.id) return action.review;
        return eachReview;
      });
      return {
        ...state,
        reviews: newReviewList
      };
    }
    case DELETE_REVIEW:
      return {
        ...state,
        review: {},
        reviews: state.reviews.filter(review => review.id !== action.reviewId)
      };
    default:
      return state;
  }
}

export default reviewReducer;
