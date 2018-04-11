import { USER_SIGNED_IN } from './../types/Types';
import api from './../apiCalls/Api';

const userLoggedIn = user => ({
  type: USER_SIGNED_IN,
  user
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

export { signin, userLoggedIn, signup };
