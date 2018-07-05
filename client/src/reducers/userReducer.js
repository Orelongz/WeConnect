import {
  USER_SIGNED_IN,
  SIGN_IN_FAILED,
  USER_LOGGED_OUT,
  FETCH_USER_DETAILS,
  EDIT_USER_DETAIL,
  EDIT_USER_DETAIL_FAILED
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
    case USER_LOGGED_OUT:
      return action.credentials;
    case EDIT_USER_DETAIL:
    case FETCH_USER_DETAILS:
      return { ...state, ...action.credentials };
    case SIGN_IN_FAILED:
    case EDIT_USER_DETAIL_FAILED:
      return { error: action.error };
    default:
      return state;
  }
}

export default userReducer;
