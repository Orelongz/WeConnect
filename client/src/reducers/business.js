import { REGISTER_BUSINESS, GET_BUSINESS_DETAILS } from './../types/Types';

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
    case GET_BUSINESS_DETAILS:
      return action.business;
    default:
      return state;
  }
}

export default business;
