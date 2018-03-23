import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../app';
import { db } from './../src/models';
import { userData } from './../mockData/serveMockData';

const { User } = db;
const { assert, should } = chai;
let authtoken1;

should();
chai.use(chaiHttp);

describe('User controller tests', () => {
  before((done) => {
    User.sync({ force: true })
      .then(() => done());
  });

  describe('Given that a user sends a POST request to /api/v1/auth/signup', () => {
    it('should return 201 status code and create new user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user1)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          assert.notEqual(
            res.body.user.password,
            userData.user1.password,
            'Password has been hashed'
          );
          assert.isNotNull(
            res.body.token,
            'Token should be available'
          );
          done();
        });
    });

    it('should return 201 status code and create new user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user2)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          assert.notEqual(
            res.body.user.password,
            userData.user2.password,
            'Password has been hashed'
          );
          assert.isNotNull(
            res.body.token,
            'Token should be available'
          );
          done();
        });
    });

    it('should return 201 status code and create new user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user6)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          assert.notEqual(
            res.body.user.password,
            userData.user2.password,
            'Password has been hashed'
          );
          assert.isNotNull(
            res.body.token,
            'Token should be available'
          );
          authtoken1 = res.body.token;
          done();
        });
    });

    it('should return 400 status code when email is not valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user5)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          assert.strictEqual(
            res.body.message,
            'Please enter a valid email address',
            'Email is not valid'
          );
          done();
        });
    });

    it('should return 406 status code when password is different from confirmPassword', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user3)
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.error.should.be.a('array');
          assert.isUndefined(
            res.body.message,
            'message is undefined'
          );
          assert.notStrictEqual(
            res.body.error,
            ['Password and confirm password fields do not match']
          );
          done();
        });
    });

    it('should return 406 status code when input fields are empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user4)
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.error.should.be.a('array');
          assert.isUndefined(
            res.body.message,
            'message is undefined'
          );
          done();
        });
    });

    it('should return 409 status code when registering a duplicate email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user1)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          assert.strictEqual(
            res.body.message,
            'This email already has an account',
            'Email already exists'
          );
          done();
        });
    });
  });

  describe('Given that a user sends a POST request to /api/v1/auth/login', () => {
    it('should return 202 status code and log the user into his/her account', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: userData.user1.email,
          password: userData.user1.password
        })
        .end((err, res) => {
          res.should.have.status(202);
          res.body.should.be.a('object');
          res.body.token.should.be.a('string');
          assert.isNotNull(
            res.body.message,
            'Welcome message'
          );
          assert.exists(
            res.body.token,
            'Token should be assigned on login'
          );
          done();
        });
    });

    it('should return 401 status code when wrong password is given', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: userData.user1.email,
          password: userData.user2.password
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          assert.strictEqual(
            res.body.message,
            'Wrong password',
            'Password does not match the email in database'
          );
          done();
        });
    });

    it('should return 404 status code when email is not registered', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: userData.user3.email,
          password: userData.user3.password
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          assert.strictEqual(
            res.body.message,
            'Email not found',
            'Email not in the database'
          );
          done();
        });
    });

    it('should return 406 status code when any input field is empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: userData.user4.email,
          password: userData.user4.password
        })
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.error.should.be.a('array');
          assert.isUndefined(
            res.body.message,
            'message is undefined'
          );
          done();
        });
    });
  });

  describe('Given that a user sends a PUT request to /api/v1/auth/user', () => {
    it('should return 200 status code and update user details', (done) => {
      chai.request(app)
        .put('/api/v1/auth/user')
        .set('authorization', authtoken1)
        .type('form')
        .send(userData.user6)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          assert.equal(
            res.body.user.lastname,
            userData.user6.lastname,
            'User details has been updated'
          );
          done();
        });
    });

    it('should return 400 status code when email is not valid', (done) => {
      chai.request(app)
        .put('/api/v1/auth/user')
        .set('authorization', authtoken1)
        .type('form')
        .send(userData.user5)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          assert.strictEqual(
            res.body.message,
            'Please enter a valid email address',
            'Email is not valid'
          );
          done();
        });
    });

    it('should return 401 status code when a token is not valid', (done) => {
      chai.request(app)
        .put('/api/v1/auth/user')
        .set('authorization', 'authtoken1IsAnInvalidString')
        .type('form')
        .send(userData.user6)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'Invalid token'
          );
          done();
        });
    });

    it('should return 401 status code when a token is not passed in', (done) => {
      chai.request(app)
        .put('/api/v1/auth/user')
        .type('form')
        .send(userData.user6)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'Please login'
          );
          done();
        });
    });

    it('should return 406 status code when input fields are empty', (done) => {
      chai.request(app)
        .put('/api/v1/auth/user')
        .set('authorization', authtoken1)
        .type('form')
        .send(userData.user4)
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.error.should.be.a('array');
          assert.isUndefined(
            res.body.message,
            'message is undefined'
          );
          done();
        });
    });
  });

  describe('Given that a user sends a GET request to /api/v1/auth/logout', () => {
    it('should return 200 status code and log out the user', (done) => {
      chai.request(app)
        .get('/api/v1/auth/logout')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          assert.isNull(
            res.body.token,
            'Token has been removed'
          );
          done();
        });
    });
  });
});
