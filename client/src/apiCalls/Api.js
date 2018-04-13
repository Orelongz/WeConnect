import axios from 'axios';

export default {
  user: {
    signup: credentials => axios.post(
      '/api/v1/auth/signup',
      { ...credentials }
    )
      .then(res => res.data.data),

    signin: credentials => axios.post(
      '/api/v1/auth/login',
      { ...credentials }
    )
      .then(res => res.data.data)
  },
  business: {
    fillStates: () => axios.get('http://locationsng-api.herokuapp.com/api/v1/states')
      .then(res => res.data)
  }
};
