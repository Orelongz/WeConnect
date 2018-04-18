import axios from 'axios';

/**
 * setAuthorizationToken()
 * @desc sets the authorization header
 * @param {String} token
 * @return {*} void
 */
function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export default setAuthorizationToken;
