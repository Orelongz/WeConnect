import {
  ADD_REVIEW,
  GET_BUSINESS_REVIEWS
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
    default:
      return state;
  }
}

export default reviewReducer;
