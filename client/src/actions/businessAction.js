import { REGISTER_BUSINESS, GET_BUSINESS_DETAILS } from './../types/Types';
import api from './../apiCalls/Api';

const registeredBusiness = business => ({
  type: REGISTER_BUSINESS,
  business
});

const gottenBusiness = business => ({
  type: GET_BUSINESS_DETAILS,
  business
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

export { newBusiness, getBusiness };
