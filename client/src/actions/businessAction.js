import {
  REGISTER_BUSINESS,
  GET_BUSINESS_DETAILS,
  GET_ALL_BUSINESSES
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

export {
  newBusiness,
  getBusiness,
  allBusinesses
};
