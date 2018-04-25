import {
  REGISTER_BUSINESS,
  GET_BUSINESS_DETAILS,
  GET_ALL_BUSINESSES,
  EDIT_BUSINESS,
  CHANGE_OWNERSHIP,
  DELETE_BUSINESS
} from './../types/Types';
import api from './../apiCalls/Api';

const registeredBusiness = business => ({
  type: REGISTER_BUSINESS,
  business
});

const newBusiness = credentials => dispatch => (
  api.business
    .newBusiness(credentials)
    .then((business) => {
      dispatch(registeredBusiness(business));
    })
);

const gottenBusiness = business => ({
  type: GET_BUSINESS_DETAILS,
  business
});

const getBusiness = businessId => dispatch => (
  api.business
    .getBusiness(businessId)
    .then((business) => {
      dispatch(gottenBusiness(business));
    })
);

const retrievedBusinesses = businesses => ({
  type: GET_ALL_BUSINESSES,
  businesses
});

const allBusinesses = () => dispatch => (
  api.business
    .allBusinesses()
    .then((businesses) => {
      dispatch(retrievedBusinesses(businesses));
    })
);

const editedBusiness = business => ({
  type: EDIT_BUSINESS,
  business
});

const editBusiness = (credentials, businessId) => dispatch => (
  api.business
    .editBusiness(credentials, businessId)
    .then((business) => {
      dispatch(editedBusiness(business));
    })
);

const ownershipChanged = business => ({
  type: CHANGE_OWNERSHIP,
  business
});

const changeOwnership = (credentials, businessId) => dispatch => (
  api.business
    .changeOwnership(credentials, businessId)
    .then((data) => {
      dispatch(ownershipChanged(data.business));
    })
);

const deletedBusiness = businessId => ({
  type: DELETE_BUSINESS,
  businessId
});

const deleteBusiness = businessId => dispatch => (
  api.business
    .deleteBusiness(businessId)
    .then(() => {
      dispatch(deletedBusiness(businessId));
    })
);

export {
  newBusiness,
  getBusiness,
  allBusinesses,
  editBusiness,
  changeOwnership,
  deleteBusiness
};
