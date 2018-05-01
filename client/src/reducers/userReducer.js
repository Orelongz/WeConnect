import {
  USER_SIGNED_IN,
  USER_LOGGED_OUT,
  FETCH_USER_DETAILS,
  EDITTED_USER_DETAIL
} from './../types/Types';

/**
 * userReducer()
 * @desc reducer for user
 * @param {Object} state
 * @param {Object} action
 * @return {Object} user
 */
function userReducer(state = {}, action = {}) {
  switch (action.type) {
    case USER_SIGNED_IN:
      return { ...state, ...action.user };
    case FETCH_USER_DETAILS:
      return { ...state, ...action.user };
    case EDITTED_USER_DETAIL:
      return { ...state, ...action.user };
    case USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
}

export default userReducer;
