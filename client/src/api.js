import axios from 'axios';

export default {
  user: {
    signin: credentials => axios.post(
      '/api/v1/auth/signin',
      { credentials }
    )
      .then(res => res.data.user)
  }
};
