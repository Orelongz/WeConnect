import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../../server/app';
import { db } from './../../server/src/models';
import { dummySignup, dummySignin } from './../helpers/dummy';

const { User } = db;
const { assert, should } = chai;

should();
chai.use(chaiHttp);

describe('User controller tests', () => {
  before((done) => {
    User.sync({ force: true })
      .then(() => done())
      .catch(err => done(err));
  });

  describe('Given that a user sends a POST request to /api/v1/auth/signup', () => {
    it('should return 201 status code and create new user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(dummySignup.validUser1)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          assert.notEqual(
            res.body.user.password,
            dummySignup.validUser1.password,
            'Password has been hashed'
          );
          assert.strictEqual(
            dummySignup.validUser1.password,
            dummySignup.validUser1.confirmPassword,
            'password and confirmPassword is the same'
          );
          done();
        });
    });

    it('should return 406 status code when password is different from confirmPassword', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(dummySignup.invalidUser1)
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
        .send(dummySignup.invalidUser2)
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

    it('should return 400 status code when email is not valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(dummySignup.invalidUser3)
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

    it('should return 409 status code when registering a duplicate email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(dummySignup.validUser1)
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
          email: dummySignin.validUser1.email,
          password: dummySignin.validUser1.password
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

    it('should return 406 status code when any input field is empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: dummySignin.invalidUser1.email,
          password: dummySignin.invalidUser1.password
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

    it('should return 404 status code when email is not registered', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: dummySignin.invalidUser2.email,
          password: dummySignin.invalidUser2.password
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

    it('should return 401 status code when wrong password is given', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: dummySignin.invalidUser3.email,
          password: dummySignin.invalidUser3.password
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
