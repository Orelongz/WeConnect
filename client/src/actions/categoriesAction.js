import { GET_ALL_CATEGORIES } from './../types/Types';
import api from './../apiCalls/Api';

const RetrievedCategories = categories => ({
  type: GET_ALL_CATEGORIES,
  categories
});

const allCategories = () => dispatch => (
  api.category
    .getCategories()
    .then((categories) => {
      dispatch(RetrievedCategories(categories));
    })
);

export default allCategories;
