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
import api from './../apiCalls/Api';

/**
 * registeredBusiness()
 * @desc registeredBusiness action
 * @param {Object} business
 * @return {Object} registeredBusiness action
 */
const registeredBusiness = business => ({
  type: REGISTER_BUSINESS,
  business
});

/**
 * newBusiness()
 * @desc dispatches registeredBusiness action
 * @param {Object} credentials
 * @return {*} void
 */
const newBusiness = credentials => dispatch => (
  api.business
    .newBusiness(credentials)
    .then((business) => {
      dispatch(registeredBusiness(business));
    })
);

/**
 * gottenBusiness()
 * @desc gottenBusiness action
 * @param {Object} business
 * @return {Object} gottenBusiness action
 */
const gottenBusiness = business => ({
  type: GET_BUSINESS_DETAILS,
  business
});

/**
 * getBusiness()
 * @desc dispatches gottenBusiness action
 * @param {String} businessId
 * @return {*} void
 */
const getBusiness = businessId => dispatch => (
  api.business
    .getBusiness(businessId)
    .then((business) => {
      dispatch(gottenBusiness(business));
    })
);

/**
 * retrievedBusinesses()
 * @desc retrievedBusinesses action
 * @param {Object} businesses
 * @return {Object} retrievedBusinesses action
 */
const retrievedBusinesses = businesses => ({
  type: GET_ALL_BUSINESSES,
  businesses
});

/**
 * paginateBusiness()
 * @desc paginateBusiness action
 * @param {Object} paginate
 * @return {Object} paginateBusiness action
 */
const paginateBusiness = paginate => ({
  type: PAGINATE_BUSINESSES,
  paginate
});

/**
 * allBusinesses()
 * @desc dispatches retrievedBusinesses and paginateBusiness action
 * @param {String} searchTerm
 * @param {String} page
 * @return {*} void
 */
const allBusinesses = (searchTerm, page) => dispatch => (
  api.business
    .allBusinesses(searchTerm, page)
    .then((data) => {
      dispatch(retrievedBusinesses(data.businesses));
      dispatch(paginateBusiness(data.paginate));
    })
);

/**
 * editedBusiness()
 * @desc editedBusiness action
 * @param {Object} business
 * @return {Object} editedBusiness action
 */
const editedBusiness = business => ({
  type: EDIT_BUSINESS,
  business
});

/**
 * editBusiness()
 * @desc dispatches editedBusiness action
 * @param {Object} credentials
 * @param {String} businessId
 * @return {*} void
 */
const editBusiness = (credentials, businessId) => dispatch => (
  api.business
    .editBusiness(credentials, businessId)
    .then((business) => {
      dispatch(editedBusiness(business));
    })
);

/**
 * ownershipChanged()
 * @desc ownershipChanged action
 * @param {Object} business
 * @return {Object} ownershipChanged action
 */
const ownershipChanged = business => ({
  type: CHANGE_OWNERSHIP,
  business
});

/**
 * changeOwnership()
 * @desc dispatches ownershipChanged action
 * @param {Object} credentials
 * @param {String} businessId
 * @return {*} void
 */
const changeOwnership = (credentials, businessId) => dispatch => (
  api.business
    .changeOwnership(credentials, businessId)
    .then((data) => {
      dispatch(ownershipChanged(data.business));
    })
);

/**
 * deletedBusiness()
 * @desc deletedBusiness action
 * @param {String} businessId
 * @return {Object} deletedBusiness action
 */
const deletedBusiness = businessId => ({
  type: DELETE_BUSINESS,
  businessId
});

/**
 * deleteBusiness()
 * @desc dispatches deletedBusiness action
 * @param {String} businessId
 * @return {*} void
 */
const deleteBusiness = businessId => dispatch => (
  api.business
    .deleteBusiness(businessId)
    .then(() => {
      dispatch(deletedBusiness(businessId));
    })
);

/**
 * userBusinessesFetched()
 * @desc userBusinessesFetched action
 * @param {Object} businesses
 * @return {Object} userBusinessesFetched action
 */
const userBusinessesFetched = businesses => ({
  type: GET_USER_BUSINESSES,
  businesses
});

/**
 * userBusinesses()
 * @desc dispatches userBusinessesFetched action
 * @return {*} void
 */
const userBusinesses = () => (dispatch) => {
  api.business
    .userBusinesses()
    .then((businesses) => {
      dispatch(userBusinessesFetched(businesses));
    });
};

/**
 * gottenBusinessRating()
 * @desc gottenBusinessRating action
 * @param {Object} rating
 * @return {Object} gottenBusinessRating action
 */
const gottenBusinessRating = rating => ({
  type: BUSINESS_RATING,
  rating
});

/**
 * userBusinesses()
 * @desc dispatches userBusinessesFetched action
 * @param {String} businessId
 * @return {*} void
 */
const businessRating = businessId => (dispatch) => {
  api.business
    .businessRating(businessId)
    .then((rating) => {
      dispatch(gottenBusinessRating(rating));
    });
};

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
