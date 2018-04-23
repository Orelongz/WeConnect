import axios from 'axios';

const basePath = '/api/v1';

export default {
  user: {
    signup: credentials => axios.post(
      `${basePath}/auth/signup`,
      { ...credentials }
    )
      .then(res => res.data.data),

    signin: credentials => axios.post(
      `${basePath}/auth/login`,
      { ...credentials }
    )
      .then(res => res.data.data)
  },
  business: {
    fillStates: () => axios.get('http://locationsng-api.herokuapp.com/api/v1/states')
      .then(res => res.data.map(eachState => eachState.name)),

    categories: () => axios.get(`${basePath}/categories`)
      .then(res => res.data.data),

    newBusiness: credentials => axios.post(
      `${basePath}/businesses`,
      { ...credentials }
    )
      .then(res => res.data.data),

    getBusiness: businessId => axios.get(`${basePath}/businesses/${businessId}`)
      .then(res => res.data.data),

    allBusinesses: () => axios.get(`${basePath}/businesses`)
      .then(res => res.data.data),

    editBusiness: credentials => axios.put(
      `${basePath}/businesses`,
      { ...credentials }
    )
      .then(res => res.data.data),

    changeOwnership: (credentials, businessId) => axios.put(
      `${basePath}/businesses/change-ownership/${businessId}`,
      { ...credentials }
    )
      .then(res => res.data),

    deleteBusiness: businessId => axios.delete(`${basePath}/businesses/${businessId}`)
      .then(res => res.data)
  }
};
