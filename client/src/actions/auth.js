import { USER_SIGNED_IN } from './../types';
import api from './../api';

const userLoggedIn = user => ({
  type: USER_SIGNED_IN,
  user
});

const signin = credentials => dispatch => (
  api.user.signin(credentials)
    .then(user => dispatch(userLoggedIn(user)))
);

export { signin, userLoggedIn };
