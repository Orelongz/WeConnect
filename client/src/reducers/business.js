import { REGISTER_BUSINESS } from './../types/Types';

/**
 * business()
 * @desc reducer for business
 * @param {Object} state
 * @param {Object} action
 * @return {Object} business
 */
function business(state = {}, action = {}) {
  switch (action.type) {
    case REGISTER_BUSINESS:
      return action.business;
    default:
      return state;
  }
}

export default business;
