import { USER_SIGNED_IN, USER_LOGGED_OUT } from './../types/Types';
import api from './../apiCalls/Api';

const userLoggedIn = user => ({
  type: USER_SIGNED_IN,
  user
});

const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

const signin = credentials => dispatch => (
  api.user
    .signin(credentials)
    .then((user) => {
      localStorage.weconnectToken = user.token;
      dispatch(userLoggedIn(user));
    })
);

const signup = credentials => dispatch => (
  api.user
    .signup(credentials)
    .then((user) => {
      localStorage.weconnectToken = user.token;
      dispatch(userLoggedIn(user));
    })
);

const logout = () => (dispatch) => {
  localStorage.removeItem('weconnectToken');
  dispatch(userLoggedOut());
};

export { signin, userLoggedIn, signup, logout };
