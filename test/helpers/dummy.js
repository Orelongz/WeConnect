const dummySignup = {
  validUser1: {
    firstname: 'Chima',
    lastname: 'Dauda',
    email: 'chima.dauda@gmail.com',
    password: 'chimauda',
    confirmPassword: 'chimauda'
  },
  validUser2: {
    firstname: 'Ricky',
    lastname: 'Orga',
    email: 'rick.orga@gmail.com',
    password: 'passrick',
    confirmPassword: 'passrick'
  },
  invalidUser1: {
    firstname: 'Jesse',
    lastname: 'Lingard',
    email: 'jessie@me.com',
    password: 'sandbull',
    confirmPassword: 'sandbullock'
  },
  invalidUser2: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  invalidUser3: {
    firstname: 'Favor',
    lastname: 'Matic',
    email: 'favor.matic',
    password: 'password',
    confirmPassword: 'password'
  }
};

const dummySignin = {
  validUser1: {
    email: 'chima.dauda@gmail.com',
    password: 'chimauda'
  },
  invalidUser1: {
    email: '',
    password: ''
  },
  invalidUser2: {
    email: 'rick.orga@gmail.com',
    password: 'passrick'
  },
  invalidUser3: {
    email: 'chima.dauda@gmail.com',
    password: 'passrick'
  }
};

const dummyBusiness = {
  validBusiness1: {
    businessName: 'Okoro and Sons Limited',
    businessImage: 'https://images.unsplash.com/photo-1513866518382-c6e2c749de1a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=77739345ea1b858247d0d2a23b3bb328&auto=format&fit=crop&w=711&q=80',
    category: 'Resturant',
    address: '10, Folorunsho Street',
    city: 'Egbeda',
    state: 'Lagos',
    phoneNumber: '07037439325',
    postalAddress: 'P.O Box 115, Ikeja, Lagos',
    workHours: '8am to 4pm',
    about: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
    in reprehenderit in voluptate velit esse llum dolore eu fugiat nulla pariatur. epteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  },
  validBusiness2: {
    businessName: 'Coffe Shop',
    category: 'Bar',
    address: '10, Okija Street',
    city: 'Yaba',
    state: 'Enugu',
    phoneNumber: '07037439325',
    about: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
    in reprehenderit in voluptate velit esse llum dolore eu fugiat nulla pariatur. epteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  },
  invalidBusiness1: {
    businessName: 'Okoro and Sons Limited',
    businessImage: 'https://images.unsplash.com/photo-1513866518382-c6e2c749de1a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=77739345ea1b858247d0d2a23b3bb328&auto=format&fit=crop&w=711&q=80',
    category: 'Bar',
    address: '30, Lamba road',
    city: 'Maitama',
    state: 'Abuja',
    phoneNumber: '090434397387',
    postalAddress: 'P.O Box 115, Ikeja, Abuja',
    workHours: '9am to 4pm',
    about: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
    in reprehenderit in voluptate velit esse llum dolore eu fugiat nulla pariatur. epteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  },
  invalidBusiness2: {
    businessName: '',
    businessImage: 'https://images.unsplash.com/photo-1513866518382-c6e2c749de1a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=77739345ea1b858247d0d2a23b3bb328&auto=format&fit=crop&w=711&q=80',
    category: '',
    address: '',
    city: '',
    state: '',
    phoneNumber: '',
    postalAddress: 'P.O Box 115, Ikeja, Lagos',
    workHours: '8am to 4pm',
    about: ''
  }
};

export { dummySignup, dummySignin, dummyBusiness };
