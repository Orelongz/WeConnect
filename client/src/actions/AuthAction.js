// import required modules
import {
  USER_SIGNED_IN,
  SIGN_IN_FAILED,
  USER_LOGGED_OUT,
  FETCH_USER_DETAILS,
  EDIT_USER_DETAIL,
  EDIT_USER_DETAIL_FAILED,
  IS_REQUEST_LOADING,
  VERIFY_ACCOUNT,
  VERIFY_ACCOUNT_FAILED
} from './../types/Types';
import setAuthorizationToken from './../utils/setAuthorizationToken';
import api from './../apiCalls/Api';
import {
  isLoading,
  successfulRequest,
  failedRequest
} from './helpers';
import { handleErrorCatch } from './../utils';

/**
 * signup()
 * @desc signs up the user
 * @param {Object} credentials
 * @param {Object} props
 * @return {*} void
 */
export const signup = (credentials, props) => (dispatch) => {
  dispatch(isLoading(IS_REQUEST_LOADING, true));

  return api.user
    .signup(credentials)
    .then((user) => {
      const { token } = user;
      localStorage.setItem('weconnectToken', token);
      setAuthorizationToken(token);
      dispatch(successfulRequest(USER_SIGNED_IN, user));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
      props.history.push('/dashboard');
    })
    .catch((error) => {
      dispatch(failedRequest(SIGN_IN_FAILED, handleErrorCatch(error.response.data)));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
    });
};

/**
 * signin()
 * @desc signs the user into the app
 * @param {Object} credentials
 * @param {Object} props
 * @return {*} void
 */
export const signin = (credentials, props) => (dispatch) => {
  dispatch(isLoading(IS_REQUEST_LOADING, true));

  return api.user
    .signin(credentials)
    .then((user) => {
      const { token } = user;
      localStorage.setItem('weconnectToken', token);
      setAuthorizationToken(token);
      dispatch(successfulRequest(USER_SIGNED_IN, user));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
      props.history.push('/businesses');
    })
    .catch((error) => {
      dispatch(failedRequest(SIGN_IN_FAILED, handleErrorCatch(error.response.data)));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
    });
};

/**
 * logout()
 * @desc logs out users
 * @return {*} void
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('weconnectToken');
  setAuthorizationToken();
  return dispatch(successfulRequest(USER_LOGGED_OUT, {}));
};

/**
 * userDetails()
 * @desc fetches details of a signed in user
 * @return {*} void
 */
export const userDetails = () => dispatch => (
  api.user
    .userDetails()
    .then((user) => {
      dispatch(successfulRequest(FETCH_USER_DETAILS, user));
    })
);

/**
 * editUser()
 * @desc edits details about a signed in user
 * @param {Object} credentials
 * @return {*} void
 */
export const editUser = credentials => (dispatch) => {
  dispatch(isLoading(IS_REQUEST_LOADING, true));

  return api.user
    .editUser(credentials)
    .then((user) => {
      const { token } = user;
      localStorage.setItem('weconnectToken', token);
      setAuthorizationToken(token);
      dispatch(successfulRequest(EDIT_USER_DETAIL, user));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
    })
    .catch((error) => {
      dispatch(failedRequest(EDIT_USER_DETAIL_FAILED, handleErrorCatch(error.response.data)));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
    });
};

/**
 * verifyAccount()
 * @desc verifies user account
 * @param {Object} credentials
 * @return {*} void
 */
export const verifyAccount = credentials => (dispatch) => {
  dispatch(isLoading(IS_REQUEST_LOADING, true));

  return api.user
    .verifyAccount(credentials)
    .then((user) => {
      const { token } = user;
      localStorage.setItem('weconnectToken', token);
      setAuthorizationToken(token);
      dispatch(successfulRequest(VERIFY_ACCOUNT, user));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
    })
    .catch((error) => {
      dispatch(failedRequest(VERIFY_ACCOUNT_FAILED, handleErrorCatch(error.response.data)));
      dispatch(isLoading(IS_REQUEST_LOADING, false));
    });
};
