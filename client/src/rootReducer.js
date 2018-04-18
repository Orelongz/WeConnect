import { combineReducers } from 'redux';
import user from './reducers/user';
import business from './reducers/business';

export default combineReducers({
  user,
  business
});
