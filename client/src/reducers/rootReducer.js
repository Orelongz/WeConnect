import { combineReducers } from 'redux';
import userReducer from './userReducer';
import businessReducer from './businessReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
  userReducer,
  businessReducer,
  categoryReducer
});
