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

const gottenBusiness = business => ({
  type: GET_BUSINESS_DETAILS,
  business
});

const retrievedBusinesses = businesses => ({
  type: GET_ALL_BUSINESSES,
  businesses
});

const editedBusiness = business => ({
  type: EDIT_BUSINESS,
  business
});

const ownershipChanged = () => ({
  type: CHANGE_OWNERSHIP
});

const deletedBusiness = () => ({
  type: DELETE_BUSINESS
});

const newBusiness = credentials => dispatch => (
  api.business
    .newBusiness(credentials)
    .then((business) => {
      dispatch(registeredBusiness(business));
    })
);

const getBusiness = businessId => dispatch => (
  api.business
    .getBusiness(businessId)
    .then((business) => {
      dispatch(gottenBusiness(business));
    })
);

const allBusinesses = () => dispatch => (
  api.business
    .allBusinesses()
    .then((businesses) => {
      dispatch(retrievedBusinesses(businesses));
    })
);

const editBusiness = credentials => dispatch => (
  api.business
    .editBusiness(credentials)
    .then((business) => {
      dispatch(editedBusiness(business));
    })
);

const changeOwnership = () => dispatch => (
  api.business
    .changeOwnership()
    .then(() => {
      dispatch(ownershipChanged());
    })
);

const deleteBusiness = businessId => dispatch => (
  api.business
    .deleteBusiness(businessId)
    .then(() => {
      dispatch(deletedBusiness());
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
