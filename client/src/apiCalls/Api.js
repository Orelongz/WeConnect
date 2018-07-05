import axios from 'axios';

const basePath = '/api/v1';

export default {
  user: {
    // api call to signup a user
    signup: credentials => axios.post(
      `${basePath}/auth/signup`,
      { ...credentials }
    )
      .then(res => res.data.data.user),

    // api call to signin a user
    signin: credentials => axios.post(
      `${basePath}/auth/login`,
      { ...credentials }
    )
      .then(res => res.data.data.user),

    // api call to get the details of a user
    userDetails: () => axios.get(`${basePath}/user`)
      .then(res => res.data.data.user),

    // api call to edit a user detail
    editUser: credentials => axios.put(
      `${basePath}/user`,
      credentials
    )
      .then(res => res.data.data.user)
  },
  business: {
    // api call to create a new business
    newBusiness: credentials => axios.post(
      `${basePath}/businesses`,
      credentials
    )
      .then(res => res.data.data.business),

    // api call to get a business detail
    getBusiness: businessId => axios.get(`${basePath}/businesses/${businessId}`)
      .then(res => res.data.data.business),

    // api call to retrieve all businesses
    allBusinesses: (search, page) => axios.get(`${basePath}/businesses?${search}&${page}`)
      .then(res => (res.data.data)),

    // api call to edit a business detail
    editBusiness: (credentials, businessId) => axios.put(
      `${basePath}/businesses/${businessId}`,
      credentials
    )
      .then(res => res.data.data.business),

    // api call to change ownership of a business
    changeOwnership: (credentials, businessId) => axios.put(
      `${basePath}/businesses/change-ownership/${businessId}`,
      { ...credentials }
    )
      .then(res => res.data.data.business),

    // api call to delete a business
    deleteBusiness: businessId => axios.delete(`${basePath}/businesses/${businessId}`)
      .then(res => res.data),

    // api call to get all businesses created by a user
    userBusinesses: () => axios.get(`${basePath}/businesses/user`)
      .then(res => res.data.data),

    // api call to get the average rating of a business
    businessRating: businessId => axios.get(`${basePath}/businesses/${businessId}/rating`)
      .then(res => res.data.data)
  },
  category: {
    // api call to retrieve the categories list
    getCategories: () => axios.get(`${basePath}/categories`)
      .then(res => res.data.data)
  },
  review: {
    // api call to add review to a business
    addReview: (credentials, businessId) => axios.post(
      `${basePath}/businesses/${businessId}/reviews`,
      { ...credentials }
    )
      .then(res => res.data.data.review),

    // api call to get all reviews for a business
    getBusinessReviews: businessId => axios
      .get(`${basePath}/businesses/${businessId}/reviews`)
      .then(res => res.data.data.reviews),

    // api call to edit a business review
    editReview: (credentials, reviewId) => axios.put(
      `${basePath}/reviews/${reviewId}`,
      { ...credentials }
    )
      .then(res => res.data.data.review),

    // api call to delete a business review
    deleteReview: reviewId => axios
      .delete(`${basePath}/reviews/${reviewId}`)
      .then(res => res.data)
  }
};
