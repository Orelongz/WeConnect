import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../../server/app';
import dummySignup from './../helpers/dummy';

const { assert } = chai;

chai.should();
chai.use(chaiHttp);

describe('User controller tests', () => {
  describe('Given that a user sends a POST request to /api/v1/auth/signup', () => {
    it('should return 201 status code and create new user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(dummySignup.validUser1)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          assert.strictEqual(
            res.body.user.email,
            dummySignup.validUser1.email,
            'email input is the same as in the database'
          );
          assert.strictEqual(
            dummySignup.validUser1.password,
            dummySignup.validUser1.confirmPassword,
            'password and confirmPassword is the same'
          );
          done();
        });
    });

    it('should return 406 status code password is different from confirmPassword', (done) => {
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
  });
});
