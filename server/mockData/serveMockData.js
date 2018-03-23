const userData = {
  user1: {
    firstname: 'Chima',
    lastname: 'Dauda',
    email: 'chima.dauda@gmail.com',
    password: 'chimauda',
    confirmPassword: 'chimauda'
  },
  user2: {
    firstname: 'Ricky',
    lastname: 'Orga',
    email: 'rick.orga@gmail.com',
    password: 'passrick',
    confirmPassword: 'passrick'
  },
  user3: {
    firstname: 'Jesse',
    lastname: 'Lingard',
    email: 'jessie@me.com',
    password: 'sandbull',
    confirmPassword: 'sandbullock'
  },
  user4: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  user5: {
    firstname: 'Favor',
    lastname: 'Matic',
    email: 'favor.matic',
    password: 'password',
    confirmPassword: 'password'
  },
  user6: {
    firstname: 'Favor',
    lastname: 'Matic',
    email: 'aunt.me@gmail.com',
    password: 'passrick',
    confirmPassword: 'passrick'
  }
};

const businessData = {
  business1: {
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
  business2: {
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
  business3: {
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
  business4: {
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
  },
  business5: {
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
  business6: {
    businessName: 'Farm fresh',
    businessImage: 'https://images.unsplash.com/photo-1513866518382-c6e2c749de1a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=77739345ea1b858247d0d2a23b3bb328&auto=format&fit=crop&w=711&q=80',
    category: 'resturant',
    address: '212, Stugart avenue',
    city: 'Mafara',
    state: 'Benue',
    phoneNumber: '090434399870',
    postalAddress: '',
    workHours: '9am to 4pm',
    about: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
    in reprehenderit in voluptate velit esse llum dolore eu fugiat nulla pariatur. epteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  }
};

const reviewData = {
  review1: {
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. I Class aptent .',
  },
  review2: {
    review: 'nteger nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus',
  },
  review3: { review: '    ' }
};

export {
  userData,
  businessData,
  reviewData
};
