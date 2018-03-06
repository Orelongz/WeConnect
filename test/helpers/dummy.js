const dummySignup = {
  validUser1: {
    firstname: 'Chima',
    lastname: 'Dauda',
    email: 'chima.dauda@gmail.com',
    password: 'chimauda',
    confirmPassword: 'chimauda'
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
  }
};

export default dummySignup;
