import { GET_ALL_CATEGORIES } from './../types/Types';
import api from './../apiCalls/Api';
import { successfulRequest } from './helpers';

/**
 * allCategories()
 * @desc dispatches RetrievedCategories action
 * @return {*} void
 */
const allCategories = () => dispatch => (
  api.category
    .getCategories()
    .then((categories) => {
      dispatch(successfulRequest(GET_ALL_CATEGORIES, categories));
    })
);

export default allCategories;
