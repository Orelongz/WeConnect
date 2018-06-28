import { GET_ALL_CATEGORIES } from './../types/Types';
import api from './../apiCalls/Api';

/**
 * RetrievedCategories()
 * @desc RetrievedCategories action
 * @param {Object} categories
 * @return {Object} RetrievedCategories action
 */
const RetrievedCategories = categories => ({
  type: GET_ALL_CATEGORIES,
  categories
});

/**
 * allCategories()
 * @desc dispatches RetrievedCategories action
 * @return {*} void
 */
const allCategories = () => dispatch => (
  api.category
    .getCategories()
    .then((categories) => {
      dispatch(RetrievedCategories(categories));
    })
);

export default allCategories;
