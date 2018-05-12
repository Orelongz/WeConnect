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
      .then(res => res.data.data.user),

    editUser: credentials => axios.put(
      `${basePath}/user`,
      { ...credentials }
    )
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

    allBusinesses: str => axios.get(`${basePath}/businesses?${str}`)
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
      .then(res => res.data),

    userBusinesses: () => axios.get(`${basePath}/businesses/user`)
      .then(res => res.data.data.businesses),

    businessRating: businessId => axios.get(`${basePath}/businesses/${businessId}/rating`)
      .then(res => res.data.data)
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
      .then(res => res.data.data.reviews),

    editReview: (credentials, reviewId) => axios.put(
      `${basePath}/reviews/${reviewId}`,
      { ...credentials }
    )
      .then(res => res.data.data.review),

    deleteReview: reviewId => axios
      .delete(`${basePath}/reviews/${reviewId}`)
      .then(res => res.data)
  }
};
