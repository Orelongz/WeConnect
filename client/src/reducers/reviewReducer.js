import { ADD_REVIEW } from './../types/Types';

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
      }
    default:
      return state;
  }
}

export default reviewReducer;
