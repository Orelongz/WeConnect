import {
  REGISTER_BUSINESS,
  GET_BUSINESS_DETAILS,
  GET_ALL_BUSINESSES
} from './../types/Types';

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
    case GET_ALL_BUSINESSES:
      return action.businesses;
    default:
      return state;
  }
}

export default business;
