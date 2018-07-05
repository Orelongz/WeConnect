import {
  IS_PAGE_LOADING,
  IS_REQUEST_LOADING
} from './../types/Types';

const initialState = {
  isPageLoading: false,
  isRequestLoading: false
};

/**
 * loadingReducer()
 * @desc reducer for page load
 * @param {Object} state
 * @param {Object} action
 * @return {Boolean} load status
 */
function loadingReducer(state = initialState, action = {}) {
  switch (action.type) {
    case IS_PAGE_LOADING:
      return { ...state, isPageLoading: action.status };
    case IS_REQUEST_LOADING:
      return { ...state, isRequestLoading: action.status };
    default:
      return state;
  }
}

export default loadingReducer;
