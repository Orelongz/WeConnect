import { USER_SIGNED_IN } from '../types';

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
    default:
      return state;
  }
}

export default user;
