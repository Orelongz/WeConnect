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

export { dummySignup, dummySignin };
