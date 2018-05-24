import {
  REGISTER_BUSINESS,
  GET_BUSINESS_DETAILS,
  GET_ALL_BUSINESSES,
  EDIT_BUSINESS,
  CHANGE_OWNERSHIP,
  DELETE_BUSINESS,
  GET_USER_BUSINESSES,
  BUSINESS_RATING,
  PAGINATE_BUSINESSES
} from './../types/Types';

const initialState = {
  businesses: [],
  business: {},
  paginate: {}
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
        business: action.business,
        businesses: [...state.businesses, action.business]
      };
    case EDIT_BUSINESS:
    case CHANGE_OWNERSHIP: {
      const newBusinessList = state.businesses.map((eachBusiness) => {
        if (eachBusiness.id === action.business.id) return action.business;
        return eachBusiness;
      });

      return {
        ...state,
        businesses: newBusinessList
      };
    }
    case GET_BUSINESS_DETAILS:
      return {
        ...state,
        business: action.business
      };
    case GET_ALL_BUSINESSES:
      return { ...state, businesses: action.businesses };
    case DELETE_BUSINESS:
      return {
        ...state,
        business: {},
        businesses: state.businesses.filter(business => business.id !== action.businessId)
      };
    case GET_USER_BUSINESSES:
      return {
        ...state,
        businesses: action.businesses
      };
    case BUSINESS_RATING:
      return {
        ...state,
        business: { ...state.business, ...action.rating }
      };
    case PAGINATE_BUSINESSES:
      return {
        ...state, paginate: action.paginate
      };
    default:
      return state;
  }
}

export default businessReducer;
