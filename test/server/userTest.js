import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../../server/app';
import { dummySignup, dummySignin } from './../helpers/dummy';

const { assert } = chai;

chai.should();
chai.use(chaiHttp);

describe('User/ index routes tests', () => {
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
    it('should return 201 status code and log the user into his/her account', (done) => {
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
          assert.isNotNull(
            res.body.message,
            'Welcome message'
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

    it('should return 401 status code when email is not registered', (done) => {
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
            'Password does not match the email provided',
            'Password does not match the email in database'
          );
          done();
        });
    });
  });
});
