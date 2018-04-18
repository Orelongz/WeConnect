import { REGISTER_BUSINESS } from './../types/Types';
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

export { newBusiness };
