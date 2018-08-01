export const signUpUser = {
  firstname: 'Chima',
  lastname: 'Dauda',
  email: 'chima.dauda@gmail.com',
  password: 'chimauda',
  confirmPassword: 'chimauda'
};

export const signUpResponse = {
  status: 'success',
  data: {
    user: {
      firstname: 'Chima',
      lastname: 'Dauda',
      email: 'chima.dauda@gmail.com',
      id: '',
      token: ''
    }
  }
};

export const signinUser = {
  email: 'chima.dauda@gmail.com',
  password: 'chimauda'
};

export const signinResponse = {
  status: 'success',
  data: {
    user: {
      firstname: 'Chima',
      lastname: 'Dauda',
      email: 'chima.dauda@gmail.com',
      id: '',
      token: '',
      userImage: '',
      isConfirmed: false
    }
  }
};

export const userDetails = {
  status: 'success',
  data: {
    user: {
      firstname: 'Chima',
      lastname: 'Dauda',
      email: 'chima.dauda@gmail.com',
      id: '',
      userImage: ''
    }
  }
};

export const userUpdate = {
  firstname: 'Jesse',
  lastname: 'Lingard',
  email: 'jessie@me.com',
  userImage: ''
};

export const userReponseFail = {
  status: 'fail',
  error: ['Some error why auth failed']
};
