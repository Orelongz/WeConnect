import {
  USER_SIGNED_IN,
  USER_LOGGED_OUT,
  FETCH_USER_DETAILS,
  EDITTED_USER_DETAIL
} from './../types/Types';
import setAuthorizationToken from './../utils/setAuthorizationToken';
import api from './../apiCalls/Api';

const userLoggedIn = user => ({
  type: USER_SIGNED_IN,
  user
});

const signup = credentials => dispatch => (
  api.user
    .signup(credentials)
    .then((user) => {
      const { token } = user;
      localStorage.weconnectToken = token;
      setAuthorizationToken(token);
      dispatch(userLoggedIn(user));
      return user;
    })
);

const signin = credentials => dispatch => (
  api.user
    .signin(credentials)
    .then((user) => {
      const { token } = user;
      localStorage.weconnectToken = token;
      setAuthorizationToken(token);
      dispatch(userLoggedIn(user));
      return user;
    })
);

const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

const logout = () => (dispatch) => {
  localStorage.removeItem('weconnectToken');
  setAuthorizationToken();
  dispatch(userLoggedOut());
};

const userFetched = user => ({
  type: FETCH_USER_DETAILS,
  user
});

const userDetails = () => (dispatch) => {
  api.user
    .userDetails()
    .then((user) => {
      dispatch(userFetched(user));
    });
};

const editedUser = user => ({
  type: EDITTED_USER_DETAIL,
  user
});

const editUser = credentials => (dispatch) => {
  api.user
    .editUser(credentials)
    .then((user) => {
      const { token } = user;
      localStorage.weconnectToken = token;
      setAuthorizationToken(token);
      dispatch(editedUser(user));
    });
};

export {
  signup,
  signin,
  logout,
  userDetails,
  userLoggedIn,
  editUser
};
