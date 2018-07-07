export const credentials = {
  businessImage: '',
  postalAddress: '',
  businessName: '',
  category: '',
  address: '',
  city: '',
  state: '',
  phoneNumber: '',
  about: '',
  startTime: '',
  closeTime: ''
};

export const businessObject = {
  status: 'success',
  data: {
    business: {
      businessId: '1be7ded6-4b9d-4d28-93e5-7305a30ef581',
      userId: '',
      businessImage: '',
      postalAddress: '',
      categoryId: '',
      businessName: '',
      category: '',
      address: '',
      city: '',
      state: '',
      phoneNumber: '',
      about: '',
      startTime: '',
      closeTime: ''
    }
  }
};

export const allBusinesses = {
  status: 'success',
  data: {
    businesses: [
      {
        businessId: '1be7ded6-4b9d-4d28-93e5-7305a30ef581',
        userId: '',
        businessImage: '',
        postalAddress: '',
        categoryId: '',
        businessName: '',
        category: '',
        address: '',
        city: '',
        state: '',
        phoneNumber: '',
        about: '',
        startTime: '',
        closeTime: ''
      },
      {
        businessId: 'bd3c6cd6-09d5-4aeb-bc03-7a9ee3f88dcb',
        userId: '',
        businessImage: '',
        postalAddress: '',
        categoryId: '',
        businessName: '',
        category: '',
        address: '',
        city: '',
        state: '',
        phoneNumber: '',
        about: '',
        startTime: '',
        closeTime: ''
      }
    ],
    paginate: {
      count: 2,
      pages: 1,
      currentPage: 1,
      pageSize: 2,
      limit: 6
    }
  }
};

export const businessRating = {
  status: 'success',
  data: { rating: 5 }
};

export const updateCredentials = {
  businessImage: '',
  postalAddress: '',
  businessName: 'updated business',
  category: '',
  address: '',
  city: '',
  state: '',
  phoneNumber: '',
  about: '',
  startTime: '',
  closeTime: ''
};

export const businessUpdate = {
  status: 'success',
  data: {
    business: {
      businessId: '1be7ded6-4b9d-4d28-93e5-7305a30ef581',
      userId: '',
      businessImage: '',
      postalAddress: '',
      categoryId: '',
      businessName: 'updated business',
      category: '',
      address: '',
      city: '',
      state: '',
      phoneNumber: '',
      about: '',
      startTime: '',
      closeTime: ''
    }
  }
};

export const businessReponseFail = {
  status: 'fail',
  error: 'Some error why business failed'
};
