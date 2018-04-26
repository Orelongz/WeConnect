import axios from 'axios';

const basePath = '/api/v1';

export default {
  user: {
    signup: credentials => axios.post(
      `${basePath}/auth/signup`,
      { ...credentials }
    )
      .then(res => res.data.data.user),

    signin: credentials => axios.post(
      `${basePath}/auth/login`,
      { ...credentials }
    )
      .then(res => res.data.data.user),

    userDetails: () => axios.get(`${basePath}/user`)
      .then(res => res.data.data.user)
  },
  business: {
    newBusiness: credentials => axios.post(
      `${basePath}/businesses`,
      { ...credentials }
    )
      .then(res => res.data.data.business),

    getBusiness: businessId => axios.get(`${basePath}/businesses/${businessId}`)
      .then(res => res.data.data.business),

    allBusinesses: () => axios.get(`${basePath}/businesses`)
      .then(res => res.data.data.businesses),

    editBusiness: (credentials, businessId) => axios.put(
      `${basePath}/businesses/${businessId}`,
      { ...credentials }
    )
      .then(res => res.data.data.business),

    changeOwnership: (credentials, businessId) => axios.put(
      `${basePath}/businesses/change-ownership/${businessId}`,
      { ...credentials }
    )
      .then(res => res.data.data),

    deleteBusiness: businessId => axios.delete(`${basePath}/businesses/${businessId}`)
      .then(res => res.data)
  },
  category: {
    getCategories: () => axios.get(`${basePath}/categories`)
      .then(res => res.data.data)
  },
  review: {
    addReview: (credentials, businessId) => axios.post(
      `${basePath}/businesses/${businessId}/reviews`,
      { ...credentials }
    )
      .then(res => res.data.data.review),

    getBusinessReviews: businessId => axios
      .get(`${basePath}/businesses/${businessId}/reviews`)
      .then(res => res.data.data.reviews)
  }
};
