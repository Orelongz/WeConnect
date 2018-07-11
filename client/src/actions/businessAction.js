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
  IS_PAGE_LOADING,
  IS_REQUEST_LOADING
} from '../types/Types';
import api from '../apiCalls/Api';
import {
  isLoading,
  successfulRequest,
  failedRequest
} from './helpers';
import { handleErrorCatch } from '../utils';

/**
 * newBusiness()
 * @desc dispatches action to create a new business
 * @param {Object} credentials
 * @param {Object} props
 * @return {*} void
 */
const newBusiness = (credentials, props) => (dispatch) => {
  dispatch(isLoading(IS_REQUEST_LOADING, true));

  return api.business
    .newBusiness(credentials)
    .then((business) => {
      dispatch(successfulRequest(REGISTER_BUSINESS, business));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
      props.history.push(`/businesses/${business.id}`);
    })
    .catch((error) => {
      dispatch(failedRequest(REGISTER_BUSINESS_FAILED, handleErrorCatch(error.response.data)));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
    });
};

/**
 * getBusiness()
 * @desc dispatches action to retrieve a business
 * @param {String} businessId
 * @param {String} props
 * @return {*} void
 */
const getBusiness = (businessId, props) => (dispatch) => {
  dispatch(isLoading(IS_PAGE_LOADING, true));

  return api.business
    .getBusiness(businessId)
    .then((business) => {
      // set documet title
      document.title = business.businessName;
      dispatch(successfulRequest(GET_BUSINESS_DETAILS, business));
      dispatch(isLoading(IS_PAGE_LOADING, false));
    })
    .catch((error) => {
      dispatch(failedRequest(GET_BUSINESS_FAILED, handleErrorCatch(error.response.data)));
      dispatch(isLoading(IS_PAGE_LOADING, false));
      props.history.push('/businesses');
    });
};

/**
 * allBusinesses()
 * @desc dispatches action to retrieve all businesses
 * @param {String} search
 * @param {String} page
 * @return {*} void
 */
const allBusinesses = (search, page) => (dispatch) => {
  dispatch(isLoading(IS_PAGE_LOADING, true));

  return api.business
    .allBusinesses(search, page)
    .then((serverResponse) => {
      // set documet title
      document.title = 'All Businesses';
      dispatch(successfulRequest(GET_ALL_BUSINESSES, serverResponse));
      dispatch(isLoading(IS_PAGE_LOADING, false));
    });
};

/**
 * editBusiness()
 * @desc dispatches action to edit a business
 * @param {Object} credentials
 * @param {String} businessId
 * @param {String} props
 * @return {*} void
 */
const editBusiness = (credentials, businessId, props) => (dispatch) => {
  dispatch(isLoading(IS_REQUEST_LOADING, true));

  return api.business
    .editBusiness(credentials, businessId, props)
    .then((business) => {
      dispatch(successfulRequest(EDIT_BUSINESS, business));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
      props.history.push(`/businesses/${business.id}`);
    })
    .catch((error) => {
      dispatch(failedRequest(EDIT_BUSINESS_FAILED, handleErrorCatch(error.response.data)));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
    });
};

/**
 * changeOwnership()
 * @desc dispatches action to change ownership of a business
 * @param {Object} credentials
 * @param {String} businessId
 * @param {String} props
 * @return {*} void
 */
const changeOwnership = (credentials, businessId, props) => (dispatch) => {
  dispatch(isLoading(IS_REQUEST_LOADING, true));

  return api.business
    .changeOwnership(credentials, businessId)
    .then((business) => {
      dispatch(successfulRequest(CHANGE_OWNERSHIP, business));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
      props.history.push('/businesses');
    })
    .catch((error) => {
      dispatch(failedRequest(CHANGE_OWNERSHIP_FAILED, handleErrorCatch(error.response.data)));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
    });
};

/**
 * deleteBusiness()
 * @desc dispatches action to delete a business
 * @param {String} businessId
 * @param {String} props
 * @return {*} void
 */
const deleteBusiness = (businessId, props) => (dispatch) => {
  dispatch(isLoading(IS_REQUEST_LOADING, true));

  return api.business
    .deleteBusiness(businessId)
    .then(() => {
      dispatch(successfulRequest(DELETE_BUSINESS, businessId));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
      props.history.push('/businesses');
    })
    .catch((error) => {
      dispatch(failedRequest(DELETE_BUSINESS_FAILED, handleErrorCatch(error.response.data)));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
      props.history.push('/businesses');
    });
};

/**
 * userBusinesses()
 * @desc dispatches action to retrieve a users's business
 * @param {String} props
 * @return {*} void
 */
const userBusinesses = props => (dispatch) => {
  dispatch(isLoading(IS_PAGE_LOADING, true));

  return api.business
    .userBusinesses()
    .then((businesses) => {
      dispatch(successfulRequest(GET_USER_BUSINESSES, businesses));
      dispatch(isLoading(IS_PAGE_LOADING, false));
    })
    .catch((error) => {
      dispatch(failedRequest(GET_USER_BUSINESSES_FAILED, handleErrorCatch(error.response.data)));
      dispatch(isLoading(IS_PAGE_LOADING, false));
      props.history.push('/businesses');
    });
};

/**
 * businessRating()
 * @desc dispatches action to get rating for a business
 * @param {String} businessId
 * @return {*} void
 */
const businessRating = businessId => dispatch => (
  api.business
    .businessRating(businessId)
    .then((data) => {
      dispatch(successfulRequest(BUSINESS_RATING, data.rating));
    })
);

export {
  newBusiness,
  getBusiness,
  allBusinesses,
  editBusiness,
  changeOwnership,
  deleteBusiness,
  userBusinesses,
  businessRating
};
