import {
  REGISTER_BUSINESS,
  REGISTER_BUSINESS_FAILED,
  GET_BUSINESS_DETAILS,
  GET_BUSINESS_FAILED,
  GET_ALL_BUSINESSES,
  EDIT_BUSINESS,
  EDIT_BUSINESS_FAILED,
  CHANGE_OWNERSHIP,
  CHANGE_OWNERSHIP_FAILED,
  DELETE_BUSINESS,
  DELETE_BUSINESS_FAILED,
  GET_USER_BUSINESSES,
  GET_USER_BUSINESSES_FAILED,
  BUSINESS_RATING,
} from './../types/Types';

const initialState = {
  businesses: [],
  business: {},
  paginate: {},
  error: null
};
/**
 * businessReducer()
 * @desc reducer for business
 * @param {Object} state
 * @param {Object} action
 * @return {Object} business
 */
function businessReducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_BUSINESS:
      return {
        ...state,
        business: action.credentials,
        businesses: [action.credentials, ...state.businesses]
      };
    case EDIT_BUSINESS:
    case CHANGE_OWNERSHIP: {
      const newBusinessList = state.businesses.map((eachBusiness) => {
        if (eachBusiness.id === action.credentials.id) return action.credentials;
        return eachBusiness;
      });

      return {
        ...state,
        business: action.credentials,
        businesses: newBusinessList
      };
    }
    case GET_BUSINESS_DETAILS:
      return {
        ...state,
        business: action.credentials,
        error: null
      };
    case GET_USER_BUSINESSES:
    case GET_ALL_BUSINESSES:
      return {
        ...state,
        businesses: action.credentials.businesses,
        paginate: action.credentials.paginate
      };
    case DELETE_BUSINESS:
      return {
        ...state,
        business: {},
        businesses: state.businesses.filter(business => business.id !== action.credentials)
      };
    case BUSINESS_RATING:
      return {
        ...state,
        business: { ...state.business, rating: action.credentials }
      };
    case DELETE_BUSINESS_FAILED:
    case GET_BUSINESS_FAILED:
    case EDIT_BUSINESS_FAILED:
    case CHANGE_OWNERSHIP_FAILED:
    case GET_USER_BUSINESSES_FAILED:
    case REGISTER_BUSINESS_FAILED:
      return { ...initialState, error: action.error };
    default:
      return state;
  }
}

export default businessReducer;
