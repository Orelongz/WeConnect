// import required modules
import {
  USER_SIGNED_IN,
  USER_LOGGED_OUT,
  FETCH_USER_DETAILS,
  EDITTED_USER_DETAIL
} from './../types/Types';
import setAuthorizationToken from './../utils/setAuthorizationToken';
import api from './../apiCalls/Api';

/**
 * userLoggedIn()
 * @desc userLoggedIn action
 * @param {Object} user
 * @return {Object} login action
 */
const userLoggedIn = user => ({
  type: USER_SIGNED_IN,
  user
});

/**
 * signup()
 * @desc dispatches signup action
 * @param {Object} credentials
 * @return {*} void
 */
export const signup = credentials => dispatch => (
  api.user
    .signup(credentials)
    .then((user) => {
      const { token } = user;
      localStorage.setItem('weconnectToken', token);
      setAuthorizationToken(token);
      dispatch(userLoggedIn(user));
      return user;
    })
);

/**
 * signin()
 * @desc dispatches signin action
 * @param {Object} credentials
 * @return {*} void
 */
export const signin = credentials => dispatch => (
  api.user
    .signin(credentials)
    .then((user) => {
      const { token } = user;
      localStorage.setItem('weconnectToken', token);
      setAuthorizationToken(token);
      dispatch(userLoggedIn(user));
      return user;
    })
);

/**
 * userLoggedOut()
 * @desc userLoggedOut action
 * @return {Object} logout action
 */
const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

/**
 * logout()
 * @desc dispatches logout action
 * @return {*} void
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('weconnectToken');
  setAuthorizationToken();
  dispatch(userLoggedOut());
};

/**
 * userFetched()
 * @desc userFetched action
 * @param {Object} user
 * @return {Object} userFetched action
 */
const userFetched = user => ({
  type: FETCH_USER_DETAILS,
  user
});

/**
 * userDetails()
 * @desc dispatches userFetched action
 * @return {*} void
 */
export const userDetails = () => dispatch => (
  api.user
    .userDetails()
    .then((user) => {
      dispatch(userFetched(user));
    })
);

/**
 * editedUser()
 * @desc editedUser action
 * @param {Object} user
 * @return {Object} editedUser action
 */
const editedUser = user => ({
  type: EDITTED_USER_DETAIL,
  user
});

/**
 * userDetails()
 * @desc dispatches editedUser action
 * @param {Object} credentials
 * @return {*} void
 */
export const editUser = credentials => dispatch => (
  api.user
    .editUser(credentials)
    .then((user) => {
      const { token } = user;
      localStorage.setItem('weconnectToken', token);
      setAuthorizationToken(token);
      dispatch(editedUser(user));
    })
);
