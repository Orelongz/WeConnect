import decode from 'jwt-decode';
import { USER_SIGNED_IN, USER_LOGGED_OUT } from './../types/Types';
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
      dispatch(userLoggedIn({ ...user, currentUser: decode(token).id }));
    })
);

const signin = credentials => dispatch => (
  api.user
    .signin(credentials)
    .then((user) => {
      const { token } = user;
      localStorage.weconnectToken = token;
      setAuthorizationToken(token);
      dispatch(userLoggedIn({ ...user, currentUser: decode(token).id }));
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

export { signup, signin, logout, userLoggedIn };
