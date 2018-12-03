import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import db from '../src/models';
import { userData } from '../mockData/serveMockData';

const { User } = db;
const { assert, should } = chai;
let authtoken1;
let authtoken2;

should();
chai.use(chaiHttp);

describe('Given that a user sends a', () => {
  before((done) => {
    User.sync({ force: true })
      .then(() => done());
  });

  describe('POST request to /api/v1/auth/signup', () => {
    it('should return 201 status code and create new user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user1)
        .end((err, res) => {
          const {
            firstname, lastname, email, token
          } = res.body.data.user;
          res.should.have.status(201);
          assert.equal(
            res.body.status,
            'success',
          );
          assert.equal(
            firstname,
            userData.user1.firstname,
            'Firstname equal'
          );
          assert.equal(
            lastname,
            userData.user1.lastname,
            'Lastname equal'
          );
          assert.equal(
            email,
            userData.user1.email.toLowerCase(),
            'email equal'
          );
          assert.isNotNull(
            token,
            'Token should be available'
          );
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
          assert.strictEqual(
            res.body.status,
            'fail'
          );
          res.body.error.should.have.be.a('array');
          assert.equal(
            res.body.error[0],
            'Invalid email',
            'Email is not valid'
          );
          done();
        });
    });

    it('should return 400 status code if any input field is empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user4)
        .end((err, res) => {
          res.should.have.status(400);
          assert.strictEqual(
            res.body.status,
            'fail'
          );
          res.body.error.should.have.be.a('array');
          done();
        });
    });

    it('should return 400 status code when registering a duplicate email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user1)
        .end((err, res) => {
          res.should.have.status(400);
          assert.strictEqual(
            res.body.status,
            'fail'
          );
          res.body.error.should.have.be.a('array');
          done();
        });
    });
  });

  describe('POST request to /api/v1/auth/login', () => {
    it('should return 200 status code and log the user into his/her account', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: userData.user1.email,
          password: userData.user1.password
        })
        .end((err, res) => {
          const {
            firstname, lastname, email, token
          } = res.body.data.user;
          authtoken1 = token;

          res.should.have.status(200);
          assert.equal(
            res.body.status,
            'success'
          );
          assert.equal(
            firstname,
            userData.user1.firstname,
            'Firstname equal'
          );
          assert.equal(
            lastname,
            userData.user1.lastname,
            'Lastname equal'
          );
          assert.equal(
            email,
            userData.user1.email,
            'Lastname equal'
          );
          assert.isString(
            token,
            'Token should be available'
          );
          done();
        });
    });

    it('should return 400 status code if any input field is empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: userData.user4.email,
          password: userData.user4.password
        })
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(
            res.body.status,
            'fail'
          );
          res.body.error.should.be.a('array');
          done();
        });
    });

    it('should return 401 status code when password does not match the given email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: userData.user1.email,
          password: userData.user2.password
        })
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.strictEqual(
            res.body.error,
            'Wrong email or password',
            'Password does not match the email in database'
          );
          done();
        });
    });
  });

  describe('PUT request to /api/v1/user', () => {
    before((done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user2)
        .end((err, res) => {
          authtoken2 = res.body.data.user.token;
          done();
        });
    });

    it('should return 200 status code and update user details', (done) => {
      chai.request(app)
        .put('/api/v1/user')
        .set('authorization', authtoken2)
        .type('form')
        .send(userData.user6)
        .end((err, res) => {
          const {
            firstname, lastname, email, token
          } = res.body.data.user;
          authtoken2 = token;

          res.should.have.status(200);
          assert.equal(
            res.body.status,
            'success'
          );
          assert.equal(
            firstname,
            userData.user6.firstname,
            'firstname updated'
          );
          assert.equal(
            lastname,
            userData.user6.lastname,
            'lastname updated'
          );
          assert.equal(
            email,
            userData.user6.email,
            'email updated'
          );
          done();
        });
    });

    it('should return 400 status code when email is not valid', (done) => {
      chai.request(app)
        .put('/api/v1/user')
        .set('authorization', authtoken1)
        .type('form')
        .send(userData.user5)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error[0],
            'Invalid email',
            'Email is not valid'
          );
          done();
        });
    });

    it('should return 400 status code when an input field is empty', (done) => {
      chai.request(app)
        .put('/api/v1/user')
        .set('authorization', authtoken1)
        .type('form')
        .send(userData.user4)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(
            res.body.status,
            'fail'
          );
          res.body.error.should.be.a('array');
          done();
        });
    });

    it('should return 401 status code when a token is not valid', (done) => {
      chai.request(app)
        .put('/api/v1/user')
        .set('authorization', 'authtoken1IsAnInvalidString')
        .type('form')
        .send(userData.user6)
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Invalid token'
          );
          done();
        });
    });

    it('should return 401 status code when a token is not passed in', (done) => {
      chai.request(app)
        .put('/api/v1/user')
        .type('form')
        .send(userData.user6)
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Token absent'
          );
          done();
        });
    });
  });

  describe('GET request to /api/v1/user', () => {
    it('should return 200 status code and retrieve user details', (done) => {
      chai.request(app)
        .get('/api/v1/user')
        .set('authorization', authtoken2)
        .end((err, res) => {
          const {
            firstname, lastname, email, id
          } = res.body.data.user;

          res.should.have.status(200);
          assert.equal(
            res.body.status,
            'success'
          );
          assert.equal(
            firstname,
            userData.user6.firstname,
            'firstname retrived'
          );
          assert.equal(
            lastname,
            userData.user6.lastname,
            'lastname retrived'
          );
          assert.equal(
            email,
            userData.user6.email,
            'email retrived'
          );
          assert.isString(
            id,
            'id is a UUID string'
          );
          done();
        });
    });
  });
});
