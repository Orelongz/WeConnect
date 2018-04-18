import { USER_SIGNED_IN, USER_LOGGED_OUT } from './../types/Types';

/**
 * user()
 * @desc reducer for user
 * @param {Object} state
 * @param {Object} action
 * @return {Object} user
 */
function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_SIGNED_IN:
      return action.user;
    case USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
}

export default user;
