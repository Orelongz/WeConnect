import axios from 'axios';

export default {
  user: {
    signin: credentials => axios.post(
      '/api/v1/auth/login',
      { ...credentials }
    )
      .then(res => res.data.data)
  }
};
