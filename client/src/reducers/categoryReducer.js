import { GET_ALL_CATEGORIES } from './../types/Types';

/**
 * categoryReducer()
 * @desc reducer for category
 * @param {Object} state
 * @param {Object} action
 * @return {Object} business
 */
function categoryReducer(state = [], action = {}) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}

export default categoryReducer;
